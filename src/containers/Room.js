import React, { useState, useEffect } from 'react'
import Gameboard from './Gameboard'

function Room(props) {

  // console.log("room: room", props.room)
  
  console.log('hit room', props.user.id)

  return (
    <div>
      HI FROM ROOM
      <button onClick={props.logout}>Leave Room</button>
      <Gameboard room={props.room} user={props.user} history={props.history} setRoom={props.setRoom} />
      <button onClick={props.deleteRoom} style={{background: 'red', float: 'right'}}>Delete Room</button>
    </div>
  )


}

export default Room