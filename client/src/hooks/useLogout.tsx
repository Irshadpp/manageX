import store from '@/store';
import { clearCredentials } from '@/store/authSlice';
import { useToast } from '@/components/ui/use-toast';
import { apiRequest } from '@/services/api/commonRequest';

const useLogout = () => {
    const {toast} = useToast()

    const logout = async () =>{
      try {
        const res = await apiRequest({
          method: 'POST',
          url: import.meta.env.VITE_BACKEND_URL,
          route: '/api/v1/auth/logout',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredential: true,
        });
    
        if(!res.success){
          toast({
            title: 'Logout Failed',
            description: 'Could not log out successfully. Please try again.',
            variant: 'destructive', // If your toast system has different variants or styles
          });
        }
        store.dispatch(clearCredentials());

        // window.location.href = "/login";
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    return logout;
};

export default useLogout;