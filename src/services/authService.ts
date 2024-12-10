import axios, { AxiosInstance } from "axios";
import { SetterOrUpdater } from "recoil";

import {
    AuthResponse,
    SignInFormData,
    SignUpFormData,
    ForgotPasswordData,
    ResetPasswordData,
    VerifyOTPData,
    User
} from "../types/auth";

const API_URL = "http://localhost:10000/api/v1";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

interface RecoilSetters {
    setToken: SetterOrUpdater<string | null>;
    setUser: SetterOrUpdater<User | null>;
}

export const createAuthService = (setters?: RecoilSetters) => ({
    signUp: async (data: SignUpFormData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>("/auth/signup", data);
        sessionStorage.setItem("userId", response.data.userId || "");
        return response.data;
    },

    login: async (data: SignInFormData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>("/auth/login", data);
        if (response.data.success && response.data.token) {
            localStorage.setItem("access_token", response.data.token);
            if (setters) {
                setters.setToken(response.data.token);
                setters.setUser(response.data.user || null);
            }
        }
        return response.data;
    },

    verifyOTP: async (data: VerifyOTPData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>("/auth/verify-otp", data);
        if (response.data.token) {
            localStorage.setItem("access_token", response.data.token);
            if (setters) {
                setters.setToken(response.data.token);
                setters.setUser(response.data.user || null);
            }
        }
        return response.data;
    },

    resendOTP: async (userId: string): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>("/auth/resend-otp", { userId });
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>("/auth/forgot-password", data);
        return response.data;
    },

    resetPassword: async (data: ResetPasswordData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>("/auth/reset-password", data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post("/auth/logout");
        localStorage.removeItem("access_token");
        if (setters) {
            setters.setToken(null);
            setters.setUser(null);
        }
    },
    updateRole: async (data: { role: string }): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>("/auth/update-role", data);
        return response.data;
    },

});
