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

  let home = () => {
    props.history.push('/home')
  }

  return (
    <div>
      <img onClick={home} className='logo' src='/logo.png' alt='' />
    <div className='home'>
      <form className='form' onSubmit={submitHandler} >
        <input type='text' value={getUsername.trimLeft()} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
        <input type='text' value={getRoomName.trimLeft()} onChange={(e) => setRoomName(e.target.value)} placeholder='Room Name' />
        <input type='password' value={getPassword} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <input id='submit' type='submit' value='Join Room' />
      </form>
    </div>
    </div>
  )
}

export default JoinRoomForm