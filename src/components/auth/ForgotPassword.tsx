import Logo from "../../assets/logo.jpeg";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";

const ForgotPassword: React.FC = () => {
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
            const response = await authService.forgotPassword({ email }); // Pass as an object
            toast.success(response.message || "Password reset email sent successfully!");
        } catch (error: any) {
            toast.error(error.message || "Failed to send reset email.");
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
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Forgot Password
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-800 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
