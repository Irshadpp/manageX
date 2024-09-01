import store from '@/store';
import { clearCredentials } from '@/store/authSlice';
import { apiRequest } from '../api/commonRequest';
import { useToast } from '@/components/ui/use-toast';

const logout = async () => {
    const {toast} = useToast()
  try {
    const res = await apiRequest({
      method: 'POST',
      route: '/api/v1/auth/logout',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredential: true,
    });

    if(!res.success){
        toast({
            title: "Logout Failed",
          description: "Could not log out successfully. Please try again.",
        })
    }
    store.dispatch(clearCredentials());

    // window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export default logout;
