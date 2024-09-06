declare module '@heroicons/react/24/outline' {
    export const MenuIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    export const XIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    // Add other icons here if needed
  }

  declare module '@headlessui/react';
  declare module '@heroicons/react/24/solid';

  declare module 'redux-persist/lib/storage' {
    const storage: any;
    export default storage;
  }
  

  