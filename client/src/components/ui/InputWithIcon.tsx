"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  field?: any;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  placeholder,
  field,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(type === "password");

  return (
    <div className="relative">
      <div className="absolute top-3 left-3">{icon}</div>
      <Input
        placeholder={placeholder}
        type={
          type === "password" ? (!showPassword ? "text" : "password") : type
        }
        {...field}
        className="px-8 bg-backgroundAccent"
      />
      {type === "password" && (
        <div
          className="absolute top-3 right-3 cursor-pointer hover:text-gray-500
          "
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </div>
      )}
    </div>
  );
};

export default InputWithIcon;
