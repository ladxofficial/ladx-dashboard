import Logo from "../../assets/logo.jpeg";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { createAuthService } from "../../services/authService";
import { accessTokenState, currentUserState } from "../../store/authState";

const ForgotPassword: React.FC = () => {
    const [, setToken] = useRecoilState(accessTokenState);
    const [, setUser] = useRecoilState(currentUserState);

    // Initialize auth service with Recoil setters
    const authService = createAuthService({
        setToken,
        setUser,
    });

    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please provide an email address.");
            return;
        }

        setLoading(true);
        try {
            const response = await authService.forgotPassword({ email });
            toast.success(response.message || "Password reset email sent successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <img src={Logo} alt="LadX Logo" className="h-16 mx-auto" />
                </div>
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Forgot Password
                </h1>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your email address, and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {loading ? "Sending..." : "Send Reset Email"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
