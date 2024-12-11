import Logo from "../../assets/logo.jpeg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAuthService } from "../../services/authService";

const VerifyOTP: React.FC = () => {
    const [otp, setOtp] = useState<string>("");
    const [resending, setResending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const navigate = useNavigate();
    const authService = createAuthService();

    const userId = sessionStorage.getItem("userId"); // Retrieve userId from session storage

    // Handle OTP verification
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        if (!userId) {
            toast.error("User session expired. Please sign up again.");
            navigate("/signup");
            return;
        }

        setVerifying(true);
        try {
            const response = await authService.verifyOTP({ userId, otp });
            toast.success(response.message);

            // Redirect user to role selection or KYC page
            navigate("/kyc");
        } catch (error: any) {
            toast.error(error.message || "OTP verification failed.");
        } finally {
            setVerifying(false);
        }
    };

    // Handle Resend OTP
    const handleResend = async () => {
        if (!userId) {
            toast.error("User session expired. Please sign up again.");
            navigate("/signup");
            return;
        }

        setResending(true);
        try {
            const response = await authService.resendOTP(userId);
            toast.success(response.message);
        } catch (error: any) {
            console.error("Resend OTP Error:", error); // Debugging
            toast.error(error.message || "Failed to resend OTP.");
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
                <div className="text-center mb-6">
                    <img src={Logo} alt="Platform Logo" className="h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">Verify Your Account</h1>
                    <p className="text-gray-600 mt-2">
                        Enter the 6-digit OTP sent to your email.
                    </p>
                </div>
                <form onSubmit={handleVerify}>
                    <div className="flex justify-center gap-2 mb-6">
                        {Array.from({ length: 6 }, (_, index) => (
                            <input
                                key={index}
                                type="text"
                                value={otp[index] || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d$/.test(value) || value === "") {
                                        setOtp((prevOtp) =>
                                            prevOtp.substring(0, index) +
                                            value +
                                            prevOtp.substring(index + 1)
                                        );
                                    }
                                }}
                                maxLength={1}
                                className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 text-white bg-blue-500 rounded-lg font-semibold ${verifying ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={verifying}
                    >
                        {verifying ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <button
                        onClick={handleResend}
                        className={`text-blue-500 ${resending ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={resending}
                    >
                        {resending ? "Resending..." : "Resend OTP"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
