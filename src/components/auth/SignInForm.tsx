import AppleIcon from "../../assets/apple-icon.png";
import GoogleIcon from "../../assets/google-icon.png";
import Logo from "../../assets/logo.jpeg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAuthService } from "../../services/authService";

const authService = createAuthService(); // Initialize authService instance

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await authService.login({ email, password });

            if (response.user) {
                toast.success("Login successful!");

                // Navigate based on user role
                const { role } = response.user;
                if (role === "sender") navigate("/sender-dashboard");
                else if (role === "traveler") navigate("/traveler-dashboard");
                else navigate("/dashboard");
            } else {
                throw new Error("User information not found.");
            }
        } catch (error: any) {
            toast.error(error?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="LADx Logo" className="h-16" />
                </div>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome!
                </h1>
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-8 text-gray-500"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2"
                            />
                            <label
                                htmlFor="rememberMe"
                                className="text-sm text-gray-600"
                            >
                                Keep me logged in
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/forgot-password")}
                            className="text-sm text-orange-600 hover:underline"
                        >
                            Forgot password
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Confirm"}
                    </button>
                </form>
                <div className="text-center my-6">
                    <p className="text-gray-600">Or login with</p>
                    <div className="flex justify-center mt-4 space-x-4">
                        <button className="p-2 rounded-lg border">
                            <img src={GoogleIcon} alt="Google" className="h-6 w-6" />
                        </button>
                        <button className="p-2 rounded-lg border">
                            <img src={AppleIcon} alt="Apple" className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                    <p>
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-orange-600 hover:underline"
                        >
                            Sign up now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
