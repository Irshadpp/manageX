import { useNavigate } from "react-router-dom";

interface ButtonPropsTypes {
  buttonText: string;
  cancelButton?: boolean;
  onClickHandler: () => void;
}

interface JoinRoomButtonsPropsTypes {
  handleJoinRoom: () => void;
  isRoomHost: boolean;
}

const Button = ({ buttonText, cancelButton = false, onClickHandler }: ButtonPropsTypes) => {
  const buttonClass = cancelButton
    ? "w-[80px] h-[30px] bg-white border border-gray-300 rounded-lg transition duration-300 hover:bg-gray-200"
    : "w-[80px] h-[30px] bg-[#2d8cff] text-white rounded-lg font-bold transition duration-300 hover:bg-blue-600";

  return (
    <button onClick={onClickHandler} className={buttonClass}>
      {buttonText}
    </button>
  );
};

const JoinRoomButtons = ({ handleJoinRoom, isRoomHost }: JoinRoomButtonsPropsTypes) => {
  const successButtonText = isRoomHost ? "Host" : "Join";
  const navigate = useNavigate();
  
  const pushToMeetings = () => {
    navigate("/owner/meetings");
  };

  return (
    <div className="flex justify-end w-full">
      <Button buttonText={successButtonText} onClickHandler={handleJoinRoom} />
      <Button
        buttonText="Cancel"
        cancelButton
        onClickHandler={pushToMeetings}
      />
    </div>
  );
};

export default JoinRoomButtons;
