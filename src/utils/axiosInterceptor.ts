import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { store } from '@/redux/store';
import { logOut, setCredentials } from '@/redux/slices/authSlice';
import { setLoading , selectIsLoading } from '@/redux/slices/appSlice';
import { API_BASE_URL } from './appConstants';

let isRefreshing: boolean = false;
let failedQueue: any[] = [];
let activeRequests = 0; // 💡 Track concurrent requests

// Helper to handle incrementing/decrementing loading states safely
const startLoading = (config : CustomAxiosRequestConfig) => {

  if( config?._retry ) return;

  if (activeRequests === 0) {
    store.dispatch(setLoading(true));
  }
  activeRequests++;
};

const stopLoading = (config : CustomAxiosRequestConfig) => {
  if( config?._retry ) return;
  activeRequests--;
  if (activeRequests <= 0) {
    activeRequests = 0; // Guard against negative numbers
    store.dispatch(setLoading(false));
  }
};

// Helper to process all blocked requests once the new token arrives
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const apiClient = axios.create({
  baseURL: API_BASE_URL, // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
};



apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    
    startLoading(config);
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    stopLoading(response.config);
    return response;
  },
  async (error: AxiosError) => {

    const originalRequest = error.config as CustomAxiosRequestConfig;
    stopLoading(originalRequest) ;
    // Any status codes outside the range of 2xx trigger this function
    if (error.response) {

      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || 'Validation failed');
          // Handle validation errors (e.g., alert user or map to form fields)
          break;
        case 401:

          // ✅ SAFEGUARD: Prevent infinite loops if the refresh call fails with a 401
          if (originalRequest?.url === '/auth/refresh' || originalRequest?.url?.endsWith('/auth/refresh')) {
            processQueue(error, null);
            store.dispatch(logOut());
            return Promise.reject(error);
          }

          if (originalRequest && !originalRequest._retry) {


            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then((token) => {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                  return apiClient(originalRequest); // Resend the query
                })
                .catch((err) => Promise.reject(err));
            }


            originalRequest._retry = true;
            isRefreshing = true;

            try {
              const refreshResult = await apiClient.post("/auth/refresh");
              console.log(refreshResult);

              if (refreshResult?.data ) {
                const data = refreshResult.data;
                store.dispatch(setCredentials({
                  accessToken: data.accessToken,
                  user: data.user
                }));

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                processQueue(null, data.accessToken);
                return apiClient(originalRequest);

              }
            }
            catch (error) {
              processQueue(error, null);
              store.dispatch(logOut());
            }
            finally {
              isRefreshing = false;
            }

          }
          console.error('Unauthorized: Please log in again.');


          // Redirect to login page or clear local storage token
          break;
        case 403:
          console.error('Forbidden: You do not have permission.');


          break;
        case 404:
          console.error('Not Found:', data.message || 'Resource not found');
          // Redirect to a 404 page or show a notification
          break;
        case 500:
          console.error('Internal Server Error:', data.message || 'Server error occurred');
          // Show a generic "Something went wrong" UI toast
          break;
        default:
          console.error(`Unhandled Error (${status}):`, data.message);
      }
    } else if (error.request) {
      // The request was made but no response was received (Network Error)
      console.error('Network error. Please check your internet connection.', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }

    // Reject the promise so individual components can still catch the error if needed
    return Promise.reject(error);
  }
);

export default apiClient;