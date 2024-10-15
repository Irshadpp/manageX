import { RootState } from '@/store';
import ConnectingButton from './ConnectingButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ConnectingButtons = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.auth)

  const pushToJoinRoomPage = () => {
    navigate(`/${user?.role}/meetings/join-room`);
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate(`/${user?.role}/meetings/join-room?host=true`);
  };

  return (
    <div className="flex flex-col items-center">
      <ConnectingButton buttonText="Join a meeting" onClickHandler={pushToJoinRoomPage} />
      {user?.role !== "employee" && <ConnectingButton createRoomButton buttonText="Host an instant meeting" onClickHandler={pushToJoinRoomPageAsHost} />}
    </div>
  );
};

export default ConnectingButtons;
