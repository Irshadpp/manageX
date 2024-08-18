import * as React from 'react';
import { PaletteMode } from '@mui/material';
import { Button } from '@shadcn/ui'; // Import ShadCN Button component
import { SunIcon, MoonIcon } from '@heroicons/react/outline'; // Use Heroicons for the icons

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

function ToggleColorMode({ mode, toggleColorMode }: ToggleColorModeProps) {
  return (
    <div className="w-8 h-8">
      <Button
        onClick={toggleColorMode}
        aria-label="button to toggle theme"
        className="w-8 h-8 p-1 flex items-center justify-center rounded-full transition-colors duration-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {mode === 'dark' ? (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-800" />
        )}
      </Button>
    </div>
  );
}

export default ToggleColorMode;
