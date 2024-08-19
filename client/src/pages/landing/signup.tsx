import Navbar from '@/components/ui/Navbar';
import SignupForm from '../../components/ui/SignupForm';


const SignUpPage = () => {
  return (
    <>
    <Navbar/>
   <div className="min-h-screen flex items-center justify-center bg-background">
      <SignupForm />
    </div> 
    </>
  );
};

export default SignUpPage;
