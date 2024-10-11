import React from 'react';
import { Button } from '../ui/button';

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
    ? 'mt-5 bg-card w-[230px] border border-border transition-all hover:bg-muted'
    : 'w-[230px] transition-all';

  return (
    <Button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </Button>
  );
};

export default ConnectingButton;
