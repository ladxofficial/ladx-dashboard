// User Interface
export interface User {
    _id: string; // MongoDB ID
    userId?: string;
    fullName: string;
    email: string;
    country: string;
    state: string;
    phoneNumber: string;
    gender: string;
    role: "sender" | "traveler" // User role
    isVerified: boolean;
    createdAt?: string; // Optional: Timestamps
    updatedAt?: string;
}


// Signup Form Data
export interface SignUpFormData {
    fullName: string;
    email: string;
    country: string;
    state: string;
    phoneNumber: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

// Login Form Data
export interface SignInFormData {
    email: string;
    password: string;
}

// OTP Verification Data
export interface VerifyOTPData {
    userId: string;
    otp: string;
}

// Role Update Data
export interface UpdateRoleData {
    role: "sender" | "traveler";
}

// Forgot Password Data
export interface ForgotPasswordData {
    email: string;
}

// Reset Password Data
export interface ResetPasswordData {
    userId: string;
    token: string;
    newPassword: string;
}

// API Response Format
export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string; // JWT token for authenticated users
    user?: User; // User data returned upon success
    userId?: string; // Temp userId during signup
}

// Auth State
export interface AuthState {
    user: User | null; // Current authenticated user
    isAuthenticated: boolean; // Is the user authenticated
    loading: boolean; // Is the app loading auth-related actions
    error: string | null; // Error message, if any
}

// Auth Context Type (Frontend)
export interface AuthContextType {
    signUp: (data: SignUpFormData) => Promise<AuthResponse>;
    login: (data: SignInFormData) => Promise<AuthResponse>;
    verifyOTP: (data: VerifyOTPData) => Promise<AuthResponse>;
    updateRole: (data: UpdateRoleData) => Promise<AuthResponse>;
    resendOTP: (userId: string) => Promise<AuthResponse>;
    forgotPassword: (data: ForgotPasswordData) => Promise<AuthResponse>;
    resetPassword: (data: ResetPasswordData) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    authToken: string | null; // Current auth token
    currentUser: User | null; // Current logged-in user
    isAuthenticated: boolean; // Authenticated state
    error: string | null; // Error state
}
