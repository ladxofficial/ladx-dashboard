import Logo from "../assets/logo.jpeg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAuthService } from "../services/authService";

const authService = createAuthService(); // Initialize authService instance

const RoleSelection: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<"sender" | "traveler">();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRole(e.target.value as "sender" | "traveler");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedRole) {
            toast.error("Please select a role to proceed.");
            return;
        }

        setLoading(true);
        try {
            const response = await authService.updateRole({ role: selectedRole }); // Call updateRole
            toast.success(response.message);

            const dashboardPath = selectedRole === "sender" ? "/sender-dashboard" : "/traveler-dashboard";
            navigate(dashboardPath);
        } catch (error: any) {
            toast.error(error?.message || "Failed to update role.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col items-center mb-6">
                    <img src={Logo} alt="Platform Logo" className="h-16 w-auto mb-4" />
                    <h1 className="text-2xl font-bold text-purple-700 text-center">
                        Select Your Role
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        Choose your role to access the right dashboard.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="role"
                                value="sender"
                                onChange={handleRoleChange}
                                className="text-purple-700 focus:ring-orange-600"
                            />
                            <span className="text-gray-800">Sender</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="role"
                                value="traveler"
                                onChange={handleRoleChange}
                                className="text-purple-700 focus:ring-orange-600"
                            />
                            <span className="text-gray-800">Traveler</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RoleSelection;
