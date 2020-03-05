import React, { useState } from 'react'
import { API_ROOT, HEADERS } from '../constants';

function CreateRoomForm (props) {

  const [getUsername, setUsername] = useState("")
  const [getRoomName, setRoomName] = useState("")
  const [getPassword, setPassword] = useState("")
  const [getPasswordConfirmation, setPasswordConfirmation] = useState("")

  let resetHooks = () => {
    setUsername("")
    setRoomName("")
    setPassword("")
    setPasswordConfirmation("")
  }

  let submitHandler = (e) => {
    e.preventDefault()

    if (getPassword === getPasswordConfirmation){
      fetch(`${API_ROOT}/rooms`, {
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
    } else {
      alert("Passwords don't match!")
    }
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
        <input type='text' value={getRoomName.trimLeft()} onChange={(e) => setRoomName(e.target.value)} placeholder='Room Name' required />
        <input type='password' value={getPassword} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <input type='password' value={getPasswordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder='Confirm Password' />
        <input id='submit' type='submit' value='Create Room' />
      </form>
    </div>
    </div>
  )
}

export default CreateRoomForm
