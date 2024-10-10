import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store';
import { setIsRoomHost } from '@/store/meetSlice';
import JoinRoomContent from './JoinRoomContent';
import JoinRoomTitle from './JoinRoomTitle';

const JoinRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const { isRoomHost } = useSelector((state: RootState) => state.meet);

  useEffect(() => {
    console.log(".........use effect called");
    const isRoomHost = searchParams.get('host') === 'true';
    if (isRoomHost) {
      dispatch(setIsRoomHost(isRoomHost));
    }
    return () => {
      dispatch(setIsRoomHost(false));
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="w-[400px] h-[400px] bg-white border border-gray-300 shadow-md flex flex-col items-start">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </div>
    </div>
  );
};

export default JoinRoom;
