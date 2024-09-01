"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  placeholder: string;
  field: any;
  title?: string;
  type?: string;
  showTitle: boolean;
}

const FormInputCustom: React.FC<InputProps> = ({
  field,
  placeholder,
  title,
  type,
  showTitle,
}) => {
  const [showPassword, setShowPassword] = useState(type === "password");

  return (
    <FormItem className="mt-2">
      {showTitle && <FormLabel>{title}</FormLabel>}
      <FormControl>
        <div className="relative">
          <Input
            placeholder={placeholder}
            type={
              type === "password" ? (!showPassword ? "text" : "password") : type
            }
            {...field}
            className="bg-background"
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
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormInputCustom;
