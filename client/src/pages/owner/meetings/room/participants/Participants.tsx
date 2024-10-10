import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

interface ParticipantProps {
  identity: string;
}

const dummyParticipants: ParticipantProps[] = [
  { identity: "irshad" },
  { identity: "shahal" },
  { identity: "razik" },
  { identity: "shamil" },
];

interface SingleParticipantProps {
  participant: { identity: string };
  lastItem: boolean;
  identity: string;
}

const SingleParticipants = ({ participant, lastItem, identity }: SingleParticipantProps) => {
  return (
    <>
      <p className="text-base font-semibold text-foreground">{identity}</p>
      {!lastItem && <span className="border-b border-gray-300 my-1"></span>}
    </>
  );
};

const Participants = () => {
  const { participants } = useSelector((state: RootState) => state.meet);

  return (
    <div className="w-full flex justify-start flex-col content-start h-[50%]">
      {participants && participants.map((participant: any, index: number) => (
        <SingleParticipants
          key={index}
          lastItem={participants.length === index + 1}
          participant={participant}
          identity={participant.identity}
        />
      ))}
    </div>
  );
};

export default Participants;
