import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils'; // Ensure your alias is set correctly

interface MenuProps {
  items?: { label: string; onClick: () => void }[];
}


interface MenuProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const Menu: React.FC<MenuProps> = ({ children, className }) => {
    return (
      <div className={cn('relative inline-block text-left', className)}>
        {children}
      </div>
    );
  };

  interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }
  
  export const MenuButton: React.FC<MenuButtonProps> = ({ children, className, ...props }) => {
    return (
      <button
        className={cn('inline-flex items-center justify-center rounded-md p-2 text-primary', className)}
        {...props}
      >
        {children}
      </button>
    );
  };


  interface MenuItemsProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const MenuItems: React.FC<MenuItemsProps> = ({ children, className }) => {
    return (
      <div className={cn('absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg', className)}>
        {children}
      </div>
    );
  };
  
