import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { API_ROOT, HEADERS } from '../constants';

function Gameboard () {

  const [getRoom, setRoom] = useState({})
  const [getSpy, setSpy] = useState(false)

  useEffect(() => {
    fetch(`${API_ROOT}/join-room`)
    .then(resp => resp.json())
    .then(room => setRoom({...room, cards: sortCards(room.cards)}))
  }, [])

  let cardCounter = () => {
    console.log('inside count: ', getRoom)
    let hash = getRoom.cards.reduce((colorHash, card) => {
      if (card.team === 'red' || card.team === 'blue'){
        if (!card.clicked){
          colorHash[card.team] ? colorHash[card.team] += 1 : colorHash[card.team] = 1
        }
      }
      return colorHash
    }, {})
    if (!hash.red){hash.red = 0}
    if (!hash.blue){hash.blue = 0}
    return hash
  }

  let handleClick = (id) => {
    if (!getSpy){
      fetch(`${API_ROOT}/click`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({room: {id}})
      })
    }
  }

  let handleReceivedRoom = (response) => {
    setRoom({...response.room, cards: sortCards(response.room.cards)})
  }

  let sortCards = (array) => {
    return array.sort((a, b) => a.id - b.id)
  }

  let newGame = () => {
    fetch(`${API_ROOT}/new-game`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({room: {id: getRoom.id}})
    })
    .then(setSpy(false))
  }

  let nextTurn = () => {
    fetch(`${API_ROOT}/next-turn`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({room: {id: getRoom.id}})
    })
  }
  console.log(getRoom)
  !!getRoom.id && console.log('hash: ', cardCounter())
  return(
    <div style={{display: 'grid', gridTemplateColumns: '94px 94px 94px 94px 94px'}}>
      <ActionCableConsumer channel={{channel: 'RoomsChannel', id: getRoom.id}} onReceived={handleReceivedRoom} onDisconnected={() => console.log("Disconected😱")} />
      {getRoom.cards && getRoom.cards.map(card => (<Card key={card.id} {...card} handleClick={handleClick} spy={getSpy}/>))}
      <button onClick={() => setSpy(!getSpy)}>{!getSpy ? 'Spymaster' : 'Field Agent'}</button>
      <button onClick={() => newGame()}>New Game</button>
      {getRoom.start === 'red' ? 
      <div><b style={{color: 'red'}}>{!!getRoom.id && cardCounter().red}</b> - <b style={{color: 'blue'}}>{!!getRoom.id && cardCounter().blue}</b></div> : 
      <div><b style={{color: 'blue'}}>{!!getRoom.id && cardCounter().blue}</b> - <b style={{color: 'red'}}>{!!getRoom.id && cardCounter().red}</b></div>}
      <button onClick={() => nextTurn()}>Next Turn</button>
      {getRoom.turn === 'red' ? `Red's Turn` : `Blue's Turn`}
    </div>
  )
}

export default Gameboard