import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:10000/api/v1/kyc";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const kycService = {
    /**
     * Submit KYC document and form data.
     * @param {FormData} data - The form data including files and other details.
     * @returns {Promise<{ success: boolean; message: string }>} API response.
     */
    submitKYC: async (data: FormData): Promise<{ success: boolean; message: string; data: any }> => {
        try {
            const response = await axiosInstance.post("/", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to submit KYC.");
        }
    },

    /**
     * Fetch KYC submissions for admin purposes.
     * @param {object} params - Query params such as `status`, `page`, and `limit`.
     * @returns {Promise<{ success: boolean; data: any[]; pagination: any }>} API response with KYC data.
     */
    fetchKYCSubmissions: async (params: Record<string, any>) => {
        try {
            const response = await axiosInstance.get("/", { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch KYC submissions.");
        }
    },
};
