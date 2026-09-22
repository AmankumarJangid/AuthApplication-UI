import axios from "axios";
import apiClient from "./axiosInterceptor";
import { logOut, setCredentials } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";

// ==========================================
// Enums & Interfaces
// ==========================================

export interface OtpStatePayload {
  flow: OtpPurpose 
  data: {
    email: string | undefined
    username?: string | undefined
    password?: string | undefined
    userId?: string
    [key: string]: any // allows extra flexible payload elements
  }
}

export enum OtpPurpose {
  REGISTRATION = "REGISTRATION",
  LOGIN = "LOGIN",
  PASSWORD_RESET = "PASSWORD_RESET",
  TWO_FACTOR_AUTH = "TWO_FACTOR_AUTH",
}

export interface VerifiedOtpResponse {
  status: number | null;
  verified: boolean | null;
  purpose: OtpPurpose | null;
}

export interface UserLogin {
  email: string | null;
  password: string | null;
}

export interface UserRegistration extends UserLogin {
  username: string | null;
}

export interface OtpVerification {
  email: string;
  otp: string;
  purpose: OtpPurpose;
}

export interface SendOtpRequest {
  email: string | null;
  purpose: OtpPurpose;
}

export interface LoginResponse {
  accessToken: string;
  user: unknown; // Replace 'unknown' with your actual User interface if available
}

// ==========================================
// Service Handlers
// ==========================================

export const handleLogout = async (): Promise<void> => {
  try {
    const response = await apiClient.post("/auth/logout");

    if (response?.status === 200) {
      console.log("Logout Successful");
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.log("Error At Logout [Auth Request]:", e.response?.data);
    } else {
      console.log("Unexpected error during logout:", e);
    }
  } finally {
    // Dispatch logout regardless of API success to clear client state safely
    store.dispatch(logOut());
  }
};

export const handleRegister = async (data: UserRegistration): Promise<void> => {
  try {
    const response = await apiClient.post("/auth/register", {
      name: data.username,
      password: data.password,
      email: data.email,
    });

    console.log("Registered successfully with response:", response.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.log("Error At Registration [Auth Request]:", e.response?.data);
    } else {
      console.log("Error At Registration [Auth Request]:", e);
    }
  }
};

export const handleLogin = async (data: UserLogin): Promise<void> => {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      password: data.password,
      email: data.email,
    });

    console.log("Form submitted:", response.data);

    store.dispatch(
      setCredentials({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.log("Error At Login [Auth Request]:", e.response?.data);
    } else {
      console.log("Error At Login [Auth Request]:", e);
    }
  }
};

export const handleSendOtp = async (request: SendOtpRequest): Promise<boolean> => {
  try {
    const response = await apiClient.post<boolean>("/otp/send", request);
    console.log("OTP Send Success:", response.data);
    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.log("Error At Sending OTP [Auth Request]:", e.response?.data);
    } else {
      console.log("Error At Sending OTP [Auth Request]:", e);
    }
    return false;
  }
};

export const handleVerifyOtp = async (data: OtpVerification): Promise<boolean> => {
  try {
    const response = await apiClient.post<VerifiedOtpResponse>("/otp/verify", data);
    return response.data.verified ?? false;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.log("Error At Verifying OTP [Auth Request]:", e.response?.data);
    } else {
      console.log("Error At Verifying OTP [Auth Request]:", e);
    }
    return false;
  }
};