import React from 'react'
import ParticipantsLabel from './ParticipantsLabel'
import Participants from './Participants'

const ParticipantsSection = () => {
  return (
    <div className='h-full w-1/6 bg-muted/60 flex flex-col'>
      <ParticipantsLabel/>
      <Participants/>
    </div>
  )
}

export default ParticipantsSection
