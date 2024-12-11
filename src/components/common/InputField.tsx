import React from "react";

export interface InputFieldProps {
    label: string;
    name: string;
    type?: "text" | "email" | "password" | "tel";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    showPassword?: boolean;  // Accept the showPassword prop
    toggleShowPassword?: () => void; // Accept toggleShowPassword prop for toggling password visibility
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    showPassword,
    toggleShowPassword,  // Destructure toggleShowPassword to be used if needed
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={type === "password" && showPassword ? "text" : type} // Show text if showPassword is true
                    value={value}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${error ? "border-red-500" : "border-gray-300"}`}
                />
                {type === "password" && toggleShowPassword && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
