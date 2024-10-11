import { AppDispatch, persistor, RootState } from '@/store';
import { resetState } from '@/store/meetSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LeaveButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {user} = useSelector((state:RootState) => state.auth)

  const handleRoomDisconnect = async () => {
    dispatch(resetState());
    setTimeout(() => {
      const siteUrl = window.location.origin;
    window.location.href = `${siteUrl}/${user?.role}/meetings`;
    }, 500);
  };

  return (
    <div className="ml-[25px] flex flex-col">
      <button
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        onClick={handleRoomDisconnect}
      >
        Leave Room
      </button>
    </div>
  );
};

export default LeaveButton;
