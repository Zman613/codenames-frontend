import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import { ActionCableConsumer } from 'react-actioncable-provider'

function Gameboard () {

  const [getRoom, setRoom] = useState({})
  const [getSpy, setSpy] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/join-room')
    .then(resp => resp.json())
    .then(room => setRoom({...room, cards: sortCards(room.cards)}))
  }, [])

  let handleClick = (id) => {
    fetch('http://localhost:3001/click', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({room: {id}})
    })
  }

  let handleReceivedRoom = (response) => {
    setRoom({...response.room, cards: sortCards(response.room.cards)})
  }

  let sortCards = (array) => {
    return array.sort((a, b) => a.id - b.id)
  }

  let newGame = () => {
    fetch('http://localhost:3001/new-game', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({room: {id: getRoom.id}})
    })
    .then(setSpy(false))
  }
  console.log(getRoom)
  return(
    <div style={{display: 'grid', gridTemplateColumns: '94px 94px 94px 94px 94px'}}>
      <ActionCableConsumer channel={{channel: 'RoomsChannel', id: getRoom.id}} onReceived={handleReceivedRoom} onDisconnected={console.log("Disconected😱")} />
      {getRoom.cards && getRoom.cards.map(card => (<Card key={card.id} {...card} handleClick={handleClick} spy={getSpy}/>))}
      <button onClick={() => setSpy(!getSpy)}>{!getSpy ? 'Spymaster' : 'Field Agent'}</button>
      <button onClick={() => newGame()}>New Game</button>
    </div>
  )
}

export default Gameboard