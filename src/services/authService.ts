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
        try {
            const response = await axiosInstance.post<AuthResponse>("/auth/signup", data);
            if (response.data.success) {
                sessionStorage.setItem("userId", response.data.userId || "");
                return response.data; // Return the response to be handled
            }
            throw new Error(response.data.message); // Handle failure case
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Signup failed.");
        }
    },

    login: async (data: SignInFormData): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>("/auth/login", data);
            if (response.data.success && response.data.token) {
                localStorage.setItem("access_token", response.data.token);
                if (setters) {
                    setters.setToken(response.data.token);
                    setters.setUser(response.data.user || null);
                }
            }
            return response.data; // Return the response
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Login failed.");
        }
    },

    verifyOTP: async (data: VerifyOTPData): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>("/auth/verify-otp", data);
            if (response.data.token) {
                localStorage.setItem("access_token", response.data.token);
                if (setters) {
                    setters.setToken(response.data.token);
                    setters.setUser(response.data.user || null);
                }
            }
            return response.data; // Return the response
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "OTP Verification failed.");
        }
    },

    resendOTP: async (userId: string): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>("/auth/resend-otp", { userId });
            return response.data; // Return the response
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Resend OTP failed.");
        }
    },

    forgotPassword: async (data: ForgotPasswordData): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>("/auth/forgot-password", data);
            return response.data; // Return the response
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Forgot password request failed.");
        }
    },

    resetPassword: async (data: ResetPasswordData): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>("/auth/reset-password", data);
            return response.data; // Return the response
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Password reset failed.");
        }
    },

    logout: async (): Promise<void> => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("access_token");
            if (setters) {
                setters.setToken(null);
                setters.setUser(null);
            }
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Logout failed.");
        }
    },

    updateRole:  async (data: { role: string }): Promise<AuthResponse> => {
        try {
            // Use PATCH instead of POST
            const response = await axiosInstance.patch<AuthResponse>("/users/role", data); 
            return response.data; // Return the response
        } catch (error: any) {
            // Handle errors and provide meaningful messages
            throw new Error(error.response?.data?.message || "Role update failed.");
        }
    },
});


// export const createAuthService = (setters?: RecoilSetters) => ({
//     signUp: async (data: SignUpFormData): Promise<AuthResponse> => {
//         try {
//             const response = await axiosInstance.post<AuthResponse>("/auth/signup", data);
//             return response.data;
//         } catch (error: any) {
//             throw new Error(error.response?.data?.message || "Signup failed.");
//         }
//     },

//     login: async (data: SignInFormData): Promise<AuthResponse> => {
//         try {
//             const response = await axiosInstance.post<AuthResponse>("/auth/login", data);

//             if (response.data.success && response.data.token) {
         
//                 setters?.setToken(response.data.token);
//                 setters?.setUser(response.data.user || null);

//                 localStorage.setItem("access_token", response.data.token);
//             }

//             return response.data;
//         } catch (error: any) {
//             throw new Error(error.response?.data?.message || "Login failed.");
//         }
//     },

//     updateRole: async (data: UpdateRoleData): Promise<AuthResponse> => {
//         try {
//             const response = await axiosInstance.patch<AuthResponse>("/auth/role", data);

//             if (response.data.success && response.data.user) {
//                 setters?.setUser(response.data.user);
//             }

//             return response.data;
//         } catch (error: any) {
//             throw new Error(error.response?.data?.message || "Failed to update role.");
//         }
//     },

//     forgotPassword: async (data: ForgotPasswordData): Promise<AuthResponse> => {
//         try {
//             const response = await axiosInstance.post<AuthResponse>("/auth/forgot-password", data);
//             return response.data;
//         } catch (error: any) {
//             throw new Error(error.response?.data?.message || "Forgot password request failed.");
//         }
//     },

//     resetPassword: async (data: ResetPasswordData): Promise<AuthResponse> => {
//         try {
//             const response = await axiosInstance.post<AuthResponse>("/auth/reset-password", data);
//             return response.data;
//         } catch (error: any) {
//             throw new Error(error.response?.data?.message || "Reset password request failed.");
//         }
//     },

//     verifyOTP: async (data: VerifyOTPData): Promise<AuthResponse> => {
//         try {
//             const response = await axiosInstance.post<AuthResponse>("/auth/verify-otp", data);
//             return response.data;
//         } catch (error: any) {
//             throw new Error(error.response?.data?.message || "OTP verification failed.");
//         }
//     },

//     resendOTP: async (userId: string): Promise<AuthResponse> => {
//         try {
//             const response = await axiosInstance.post<AuthResponse>(`/auth/resend-otp`, { userId });
//             return response.data;
//         } catch (error: any) {
//             throw new Error(error.response?.data?.message || "Failed to resend OTP.");
//         }
//     },
// });

