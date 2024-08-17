import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';


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
