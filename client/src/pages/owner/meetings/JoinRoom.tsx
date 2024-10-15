import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store';
import { setIsRoomHost } from '@/store/meetSlice';
import JoinRoomContent from '../../../components/meetings/JoinRoomContent';
import JoinRoomTitle from '../../../components/meetings/JoinRoomTitle';

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
    <div className="flex h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.35)] rounded-lg w-full max-w-md bg-card p-5 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="p-5 space-y-5 flex flex-col ">

        <div className="text-center w-full">
        <JoinRoomTitle isRoomHost={isRoomHost} />
      </div>
        <JoinRoomContent />
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
