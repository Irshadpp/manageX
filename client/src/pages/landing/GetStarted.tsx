import Managex from '@/components/ui/Managex'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4">
    <div className="flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-5 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
      <div className="p-1 space-y-3 flex flex-col items-center text-center">
        <div className="flex">
        <h1 className="text-3xl font-bold">Welcome to</h1>
          <h3 className="text-3xl font-bold ml-2">
            <Managex />
          </h3>
        </div>
        <h5 className="text-xl font-semibold">Stpe 2: User Registration</h5>
        <p className="text-[17px] font-semibold">Enjoy using our app</p>
        <Button asChild><Link to="/user-details">Next</Link></Button>
      </div>
    </div>
  </div>
  )
}

export default GetStarted
