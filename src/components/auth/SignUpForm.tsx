import InputField from "../common/InputField";
import Logo from "../../assets/logo.jpeg";
import React, { useState } from "react";
import SelectField from "../common/SelectField";
import StateSelector from "../common/StateSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import { SignUpFormData } from "../../types/auth";

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        fullName: "",
        email: "",
        country: "",
        state: "",
        phoneNumber: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};

        if (!formData.fullName.trim()) {
            errors.fullName = "Full name is required.";
        } else if (formData.fullName.length < 3) {
            errors.fullName = "Full name must be at least 3 characters.";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email format.";
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required.";
        } else if (!/^\+\d{10,15}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = "Phone number must be in E.164 format, e.g., +1234567890.";
        }

        if (!formData.country.trim()) {
            errors.country = "Country is required.";
        }

        if (!formData.state.trim()) {
            errors.state = "State is required.";
        }

        if (!formData.gender.trim()) {
            errors.gender = "Gender is required.";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }

        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = "Confirm password is required.";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" })); // Clear specific error
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await authService.signUp(formData);
            toast.success(response.message);
            navigate("/verify-otp");
        } catch (error: any) {
            toast.error(error.message || "Sign-up failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-lg">
                <div className="text-center py-6 px-6">
                    <img src={Logo} alt="Platform Logo" className="h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
                    <p className="text-gray-600 mt-2">Sign up to get started</p>
                </div>
                <form onSubmit={handleSubmit} className="px-8 pb-6">
                    {Object.keys(formErrors).length > 0 && (
                        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
                            {Object.values(formErrors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
                    <InputField
                        label="Full Name"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        error={formErrors.fullName}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        error={formErrors.email}
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            label="Country"
                            name="country"
                            value={formData.country}
                            options={[
                                { value: "Rwanda", label: "Rwanda" },
                                { value: "Nigeria", label: "Nigeria" },
                            ]}
                            error={formErrors.country}
                            onChange={handleChange}
                        />
                        <StateSelector
                            country={formData.country}
                            value={formData.state}
                            error={formErrors.state}
                            onChange={handleChange}
                        />
                    </div>
                    <InputField
                        label="Phone Number"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        error={formErrors.phoneNumber}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                            { value: "Other", label: "Other" },
                        ]}
                        error={formErrors.gender}
                        onChange={handleChange}
                    />
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password *
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 mt-6 transition duration-300"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>
                <div className="text-center text-sm text-gray-600 py-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/signin")}
                        className="text-purple-900 hover:underline"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
