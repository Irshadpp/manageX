import Managex from '@/components/ui/Managex'
import Navbar from '@/components/ui/Navbar'
import Logo from '/logo.png'
import LoginImage from '/login.jpg'
import { Link } from 'react-router-dom'
import GoogleAuth from '@/components/ui/GoogleAuth'
import Footer from '@/components/ui/Footer'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <>
      <Navbar />
      <div className=" grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mb-5 bg-background">
        <div className="flex px-5 pt-20 md:p-5">
          <div className="w-full lg:px-20">
            <div className="flex gap-1 py-10">
              <img src={Logo} className="h-14" alt="mX" />
              <h1 className="text-5xl font-bold">
                <Managex />
              </h1>
            </div>
            <div className="text-2xl font-bold py-5">Log in</div>
            <LoginForm />
            <p className="text-primary text-center py-10 font-semibold">
              Forgot password?
            </p>
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <span className="text-gray-500">or</span>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>
            <GoogleAuth />
            <p className="mt-10">Don't have an account?  <Link to="/signup" className="text-primary">Signup</Link></p>
          </div>
        </div>
        <div className="h-screen">
         <img className='w-full h-screen' src={LoginImage} alt="image" />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
