import * as React from 'react';
import { cn } from '../../lib/utils'; // Utility function for classNames, if you have one

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, className, ...props }) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};

