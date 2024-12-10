import React from "react";

export interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    options: { value: string; label: string }[];
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    value,
    options,
    error,
    onChange,
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
            >
                <option value="" disabled>
                    Select {label}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default SelectField;
