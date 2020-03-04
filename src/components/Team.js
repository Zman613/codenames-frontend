import React, { useState, useEffect } from 'react'
import { API_ROOT, HEADERS } from '../constants';
import { ActionCableConsumer } from 'react-actioncable-provider'

function Team (props) {

  const [getUsers, setUsers] = useState([])

  useEffect(() => {
    fetch(`${API_ROOT}/users`, {
      headers: {Authorization: localStorage.token}
    })
    .then(res => res.json())
    .then(users => {setUsers(users)})
  }, [])

  let clickHandle = (team) => {
    let id = props.user.id
    fetch(`${API_ROOT}/users/${id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({team})
    })
  }

  let handleReceivedUsers = (users) => {
    setUsers(users)
  }

  useEffect(() => {
    let user = getUsers.find(user => (user.id === props.user.id))
    if (user) {
      props.setUser(user)
    }
  }, [getUsers])

  console.log('team users: ', getUsers)
  return (
    <div style={{display: 'contents'}}>
      <ActionCableConsumer channel={{channel: 'UsersChannel', id: props.room.id}} onReceived={handleReceivedUsers} onDisconnected={() => console.log("Disconected😱")} />
      <div className='blue-team'>
        <button onClick={() => clickHandle('blue')}>Blue Team</button>
          <div>{getUsers.filter(user => user.team === 'blue').map(user => (<center key={user.id} onClick={() => {user.username === props.user.username && clickHandle(null)}}>{user.username} {!!user.spymaster && 'SM'}</center>))}</div>
      </div>
      <div className='red-team'>
        <button onClick={() => clickHandle('red')}>Red Team</button>
        <div>{getUsers.filter(user => user.team === 'red').map(user => (<center key={user.id} onClick={() => {user.username === props.user.username && clickHandle(null)}}>{user.username} {!!user.spymaster && 'SM'}</center>))}</div>
      </div>
    </div>
  )

}

export default Team