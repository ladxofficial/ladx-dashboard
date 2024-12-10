import Logo from "../assets/logo.jpeg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { kycService } from "../services/kycService";

const KYC: React.FC = () => {
    const [formData, setFormData] = useState({
        residentialAddress: "",
        workAddress: "",
        identityType: "",
    });
    const [identityDocument, setIdentityDocument] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIdentityDocument(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!identityDocument) {
            toast.error("Please upload your identity document.");
            return;
        }

        const kycData = new FormData();
        kycData.append("residential_address", formData.residentialAddress);
        kycData.append("work_address", formData.workAddress);
        kycData.append("identity_type", formData.identityType);
        kycData.append("identity_document", identityDocument);

        setLoading(true);

        try {
            const response = await kycService.submitKYC(kycData);
            toast.success(response.message);
            navigate("/role-selection");
        } catch (error: any) {
            toast.error(error.message || "Failed to submit KYC.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <div className="flex flex-col items-center mb-6">
                    <img src={Logo} alt="Platform Logo" className="h-16 w-auto mb-4" />
                    <h1 className="text-2xl font-bold text-purple-700">Complete Your KYC</h1>
                    <p className="text-gray-600 text-sm mt-2">
                        Provide accurate details to complete your verification.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Residential Address
                        </label>
                        <input
                            type="text"
                            name="residentialAddress"
                            value={formData.residentialAddress}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                            placeholder="Enter your residential address"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Work Address
                        </label>
                        <input
                            type="text"
                            name="workAddress"
                            value={formData.workAddress}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                            placeholder="Enter your work address"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Identity Type
                        </label>
                        <select
                            name="identityType"
                            value={formData.identityType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                            required
                        >
                            <option value="">Select Identity Type</option>
                            <option value="national_id">National ID</option>
                            <option value="passport">Passport</option>
                            <option value="driver_license">Driver's License</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Identity Document
                        </label>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit KYC"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default KYC;
