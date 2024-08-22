import React, { useState } from 'react'
import { FormControl, FormItem, FormMessage, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps{
    field: any;
    title?: string;
    type?: string;
    placeholder: string;
    showTitle: boolean;
}


const FormInput: React.FC<InputProps> = ({
    field,
    title,
    type,
    placeholder,
    showTitle 
}) => {
    const [showPassword, setShowPassword] = useState(type === "password");
    
  return (
    <FormItem className='text-start'>
        {showTitle && <FormLabel className='font-semibold'>{title}</FormLabel>}
        <FormControl>
        <div className='relative'>
            <Input
            placeholder={placeholder}
            type={
                type === "password" ? (!showPassword ? "text" : "password") : type
            }
            {...field}
            className='bg-background'
            />
            {type === "password" && (
                <div className='absolute top-3 left-3 cursor-pointer hover:text-gray-500' onClick={()=> setShowPassword(!showPassword)}>
                    {showPassword ? <FiEye/> : <FiEyeOff/>}
                </div>
            )}
        </div>
        </FormControl>
        <FormMessage/>
    </FormItem>
  )
}

export default FormInput
