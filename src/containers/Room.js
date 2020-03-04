import React, {useState} from 'react'
import Gameboard from './Gameboard'
import Team from '../components/Team'
import Data from '../components/Data'
import Menu from '../components/Menu'
import HowToModal from '../components/HowToModal'
import SettingsModal from '../components/SettingsModal'

function Room (props) {

  // console.log("room: room", props.room)
  const [getSpy, setSpy] = useState(props.user.spymaster)
  const [getHowTo, setHowTo] = useState(false)
  const [getSettings, setSettings] = useState(false)
  console.log('hit room', props.user.id)
  console.log('how to: ', getHowTo)
  return (
    <div className='room'>
      <Menu setHowTo={setHowTo} setSettings={setSettings} />
      <button className='leave-room' onClick={props.logout}>Leave Room</button>
      <Team user={props.user} room={props.room} setUser={props.setUser} />
      <img className='header' src='/codenames_codenames-13.png' alt='' />
      <Gameboard room={props.room} user={props.user} history={props.history} setRoom={props.setRoom} getSpy={getSpy} />
      <Data room={props.room} user={props.user} getSpy={getSpy} setSpy={setSpy} />
      {!!getHowTo && <HowToModal setHowTo={setHowTo}/>}
      {!!getSettings && <SettingsModal setSettings={setSettings} deleteRoom={props.deleteRoom} />}
    </div>
  )


}

export default Room