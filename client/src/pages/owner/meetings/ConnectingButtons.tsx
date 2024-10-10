import ConnectingButton from './ConnectingButton';
import { useNavigate } from 'react-router-dom';

const ConnectingButtons = () => {
  const navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate('/owner/meetings/join-room');
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate('/owner/meetings/join-room?host=true');
  };

  return (
    <div className="flex flex-col">
      <ConnectingButton buttonText="Join a meeting" onClickHandler={pushToJoinRoomPage} />
      <ConnectingButton createRoomButton buttonText="Host a meeting" onClickHandler={pushToJoinRoomPageAsHost} />
    </div>
  );
};

export default ConnectingButtons;
