import React from 'react'
import { FormItem, FormLabel, FormMessage } from '../ui/form';

import InputWithIcon from './InputWithIcon';
interface InputWithIconProps{
    icon: React.ReactNode;
    field: any;
    placeholder: string;
    title?: string;
    type?: string;
    showTitle: boolean
}

const FormInputWithIcon: React.FC<InputWithIconProps> = ({
    icon,
    field,
    placeholder,
    title,
    type,
    showTitle
}) => {

  return (
    <FormItem>
        {showTitle && <FormLabel>{title}</FormLabel>}
        <InputWithIcon 
        icon={icon}
        placeholder={placeholder}
        field={field}
        type={type}
        />
        <FormMessage/>
    </FormItem>
  )
}

export default FormInputWithIcon
