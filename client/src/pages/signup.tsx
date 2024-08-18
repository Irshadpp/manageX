import { LandingNav } from '@/components/ui/Navbar';
import SignupForm from '../components/ui/SignupForm';


const SignUpPage = () => {
  return (
    <>
    <LandingNav/>
   <div className="min-h-screen flex items-center justify-center bg-background">
      <SignupForm />
    </div> 
    </>
  );
};

export default SignUpPage;
