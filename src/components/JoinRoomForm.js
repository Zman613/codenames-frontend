import React, { useState } from 'react'
import { API_ROOT, HEADERS } from '../constants';

function JoinRoomForm (props) {

  const [getUsername, setUsername] = useState("")
  const [getRoomName, setRoomName] = useState("")
  const [getPassword, setPassword] = useState("")

  let resetHooks = () => {
    setUsername("")
    setRoomName("")
    setPassword("")
  }

  let submitHandler = (e) => {
    e.preventDefault()
    
    fetch(`${API_ROOT}/join-room`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        username: getUsername,
        name: getRoomName,
        password: getPassword
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        resetHooks()
        alert(response.errors)
      } else {
        console.log("response: ", response)
        props.setCurrentRoom(response.room.room)
        props.setUser(response.user)
        localStorage.token = response.token
        localStorage.user = response.userToken
        resetHooks()
        props.history.push('/room')
      }
    })
  }

  return (
    <>
      <form onSubmit={submitHandler} >
        <input type='text' value={getUsername} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type='text' value={getRoomName} onChange={(e) => setRoomName(e.target.value)} placeholder='Room Name' />
        <input type='password' value={getPassword} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <input type='submit' value='Join Room' />
      </form>
    </>
  )
}

export default JoinRoomForm