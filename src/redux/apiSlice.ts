// import { createApi, fetchBaseQuery, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { setCredentials , logOut} from './slices/AuthSlice';
// import type { RootState } from './store';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:8082/api/v1',
//   credentials: 'include',
//   prepareHeaders: (headers, { getState }) => {
//     const state = (getState() as RootState);
//     const token = state.auth?.token;

//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithReAuth : BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError>  = async ( args, api, extraOptions ) =>{ // api is store   
//     let result = await baseQuery(args , api , extraOptions);

//     const authState = (api.getState() as RootState).auth;


//     if( result?.error?.status == 403 ){
//         console.log( 'Sending refresh Token ');

//         const refreshResult =   await baseQuery('/auth/refresh' , api , extraOptions);
//         console.log( refreshResult )

//         if( refreshResult?.data){
//             const user = api.getstate().auth.user;
//             api.dispatch(setCredentials({ ...refreshResult.data , user}));
//             // retry the original query with new accessToken


//             result = await baseQuery(args , api , extraOptions);
//         }
//         else{
//             api.dispatch(logOut( ));
//         }
//     }
// }

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery,
//   endpoints: () => ({}),
// }); 