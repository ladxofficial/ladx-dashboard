import React from "react";

interface StateSelectorProps {
    country: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const stateOptions: Record<string, { value: string; label: string }[]> = {
    Rwanda: [
        { value: "Kigali", label: "Kigali" },
        { value: "Northern Province", label: "Northern Province" },
        { value: "Western Province", label: "Western Province" },
        { value: "Eastern Province", label: "Eastern Province" },
        { value: "Southern Province", label: "Southern Province" },
    ],
    Nigeria: [
        { value: "Lagos", label: "Lagos" },
        { value: "Abuja", label: "Abuja" },
        { value: "Rivers", label: "Rivers" },
        { value: "Kaduna", label: "Kaduna" },
        { value: "Kano", label: "Kano" },
    ],
};

const StateSelector: React.FC<StateSelectorProps> = ({
    country,
    value,
    error,
    onChange,
}) => {
    const states = stateOptions[country] || [];

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
                name="state"
                value={value}
                onChange={onChange}
                disabled={!states.length}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
            >
                <option value="" disabled>
                    Select State
                </option>
                {states.map((state) => (
                    <option key={state.value} value={state.value}>
                        {state.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default StateSelector;
