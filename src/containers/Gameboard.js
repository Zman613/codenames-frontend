import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { API_ROOT, HEADERS } from '../constants';

function Gameboard (props) {

  // const [props.room, setRoom] = useState({})
  // const [getSpy, setSpy] = useState(props.user.spymaster)
  let getSpy = props.getSpy

  // useEffect(() => {
  //   fetch(`${API_ROOT}/join-room`)
  //   .then(resp => resp.json())
  //   .then(room => setRoom({...room, cards: sortCards(room.cards)}))
  // }, [])
  // const roomID = props.room.id
  
  useEffect(() => {
    !!props.room.id && props.setRoom({...props.room, cards: sortCards(props.room.cards)})
    // console.log("use effect gb: ")
  }, [props.room.id])

  useEffect(() => {
    let id = props.user.id
    fetch(`${API_ROOT}/spymaster/${id}`,{
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({sm: getSpy})
    })
  }, [getSpy])

  let handleClick = (id, clicked) => {
    if (!getSpy && !clicked && props.user.team === props.room.turn){
      fetch(`${API_ROOT}/click`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({room: {card_id: id, id: props.room.id}})
      })
    }
  }

  let handleReceivedRoom = (response) => {
    props.setRoom({...response.room, cards: sortCards(response.room.cards)})
  }

  let sortCards = (array) => {
    return array.sort((a, b) => a.id - b.id)
  } 

  // console.log(props.room)
  return(
    <div className='gameboard'>
      <ActionCableConsumer channel={{channel: 'RoomsChannel', id: props.room.id}} onReceived={handleReceivedRoom} onDisconnected={() => console.log("Disconected😱")} />
      {props.room.cards && props.room.cards.map(card => (<Card key={card.id} {...card} handleClick={handleClick} spy={getSpy}/>))}
    </div>
  )
}

export default Gameboard