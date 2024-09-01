import { apiRequest } from '@/services/api/commonRequest';
import { setCredentials } from '@/store/authSlice';
import { storeObject } from '@/utils/local-storage';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const 
GoogleAuth = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSuccess = async (credentialResponse: CredentialResponse) =>{
    try {
    const token = credentialResponse.credential;
    if(!token){
      return setError("Please use valid email account")
    }
        const res = await apiRequest({
          method: "POST",
          url: import.meta.env.VITE_USERS_URL,
          route: "/api/v1/auth/google",
          data: {token},
          headers:{
            "Content-Type": "application/json"
          }
        });

        if(!res.success){
          return setError(res?.errors[0]?.message || "Google signup failed Please try again later");
        }
        const userData = {
          user: {...res.user},
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        }

        storeObject("userData", userData);
        dispatch(setCredentials(userData));

        switch(userData.user.role){
          case 'owner':
            navigate("/owner");
            break;
          case 'manager': 
            navigate("/manager");
            break;
          case 'employee':
            navigate("/employee");
            break;
          case 'admin':
            navigate("/admin");
        }      
      } catch (error) {
        console.log(error);
        setError("An error occured during google signup");
      }
  }
  return (
    <div className='flex justify-center items-center pt-8'>
      <GoogleLogin
  onSuccess={handleSuccess}
  onError={() => {
    console.log('Login Failed');
  }}
/>
    </div>
  )
}

export default GoogleAuth
