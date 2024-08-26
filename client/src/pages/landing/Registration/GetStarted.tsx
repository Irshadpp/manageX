import Managex from '@/components/ui/Managex'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import UserDetails from './UserDetails';
import OrganizationDetails from './OrganizationDetails';
import OrganizationAddress from './OrganizationAddress';
import RegistrationComplete from './RegistrationComplete';

const GetStarted = () => {
  const [currPage, setCurrPage] = useState(0);

  const handleNext = () =>{
    if(currPage < 4){
      setCurrPage( currPage + 1);
    } 
  }

  const handleBack = () =>{
    if(currPage > 0){
      setCurrPage(currPage - 1);
    }
  }

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
        <div className='space-y-3'>
        {currPage === 0 && (
          <>
          <h5 className="text-xl font-semibold">Stpe 1: Get Started</h5>
          <p className="text-[17px] font-semibold">Welcome to the ManageX App</p>
          <Button onClick={handleNext}>Next</Button>
          </>
        )}
        {currPage === 1 && <UserDetails handleNext={handleNext}/>}
        {currPage === 2 && <OrganizationDetails handleNext={handleNext}/>}
        {currPage === 3 && <OrganizationAddress handleNext={handleNext}/>}
        {currPage === 4 && <RegistrationComplete/>}
        {currPage !== (0 || 4)&&   (
          <div className="">
        <Button className='bg-secondary' onClick={handleBack}>Back</Button>
        </div>
        )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default GetStarted
