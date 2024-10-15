import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
interface ButtonPropsTypes {
  buttonText: string;
  cancelButton?: boolean;
  onClickHandler: () => void;
}

interface JoinRoomButtonsPropsTypes {
  handleJoinRoom: () => void;
  isRoomHost: boolean;
}

const CusomButton = ({ buttonText, cancelButton = false, onClickHandler }: ButtonPropsTypes) => {
  const buttonClass = cancelButton
    ? "w-[80px] h-[30px] bg-outline border transition duration-300 hover:bg-muted"
    : "w-[80px] h-[30px] bg-primary font-bold transition duration-300";

  return (
    <Button onClick={onClickHandler} className={buttonClass}>
      {buttonText}
    </Button>
  );
};

const JoinRoomButtons = ({ handleJoinRoom, isRoomHost }: JoinRoomButtonsPropsTypes) => {
  const successButtonText = isRoomHost ? "Host" : "Join";
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.auth)
  
  const pushToMeetings = () => {
    navigate(`/${user?.role}/meetings`);
  };

  return (
    <div className="flex space-x-2 justify-end w-full">
      <CusomButton buttonText={successButtonText} onClickHandler={handleJoinRoom} />
      <CusomButton
        buttonText="Cancel"
        cancelButton
        onClickHandler={pushToMeetings}
      />
    </div>
  );
};

export default JoinRoomButtons;
