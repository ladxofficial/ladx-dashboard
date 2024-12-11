import InputField from "../common/InputField";
import React, { useState } from "react";
import SelectField from "../common/SelectField";
import StateSelector from "../common/StateSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAuthService } from "../../services/authService";
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

    const handleTogglePassword = () => setShowPassword(prev => !prev);  // Function to toggle password visibility
    const handleToggleConfirmPassword = () => setShowConfirmPassword(prev => !prev); // Function to toggle confirm password visibility

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: "" })); // Clear specific error
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        const authService = createAuthService();

        try {
            const response = await authService.signUp(formData);

            // Ensure you're using the response if necessary
            if (response.success) {
                toast.success("Sign up successful!");
                navigate("/verify-otp");
            } else {
                throw new Error(response.message); // Handle the case when signup is not successful
            }
        } catch (error: any) {
            toast.error(error.message || "Sign up failed.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                error={formErrors.fullName}
            />

            {/* Email Input */}
            <InputField
                label="Email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
            />
            <InputField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={formErrors.phoneNumber}
            />
            <SelectField
                label="Country"
                name="country"
                value={formData.country}
                options={[
                    { value: "Rwanda", label: "Rwanda" },
                    { value: "Nigeria", label: "Nigeria" },
                    // Add more countries as needed
                ]}
                onChange={handleChange}
                error={formErrors.country}
            />
            <StateSelector
                country={formData.country}
                value={formData.state}
                onChange={handleChange}
                error={formErrors.state}
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
                onChange={handleChange}
                error={formErrors.gender}
            />
            {/* Password Input */}
            <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                showPassword={showPassword}
                toggleShowPassword={handleTogglePassword}
            />

            {/* Confirm Password Input */}
            <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                showPassword={showConfirmPassword}
                toggleShowPassword={handleToggleConfirmPassword}
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-500 text-white rounded-lg"
            >
                {loading ? "Signing Up..." : "Sign Up"}
            </button>
        </form>
    );
};

export default SignUpForm;
