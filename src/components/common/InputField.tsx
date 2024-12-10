import React from "react";

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    type?: "text" | "email" | "password" | "tel";
    placeholder?: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    value,
    type = "text",
    placeholder = "",
    error,
    onChange,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full px-4 py-2 rounded-lg border-2 focus:ring focus:ring-opacity-50 focus:ring-brand-purple ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
