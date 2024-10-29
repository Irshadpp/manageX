import React from 'react'
import NOTFOUND from "/managex404.png"
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      navigate(`/${user.role}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <img src={NOTFOUND} alt="Page Not Found" className="w-full max-w-md mb-8" />
      <h1 className="text-5xl font-bold text-foreground mt-6">Oops!</h1>
      <p className="text-foreground text-xl text-center mt-4 mb-8">
        We can’t seem to find the page you are looking for.
      </p>
      <Button size="lg" onClick={handleButtonClick} className="px-6 py-3">
        Back To Home Page
      </Button>
    </div>
  );
};

export default NotFound;
