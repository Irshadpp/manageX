import React from 'react';

interface ConnectingButtonProps {
  createRoomButton?: boolean;
  buttonText: string;
  onClickHandler: () => void;
}

const ConnectingButton: React.FC<ConnectingButtonProps> = ({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}) => {
  const buttonClass = createRoomButton
    ? 'mt-4 bg-card text-card-foreground border border-border w-[180px] h-[30px] rounded-md transition-all hover:bg-muted'
    : 'bg-blue-500 text-white border border-border w-[180px] h-[30px] rounded-md transition-all hover:bg-blue-700';

  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
};

export default ConnectingButton;
