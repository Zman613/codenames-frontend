import React from 'react'
import { API_ROOT, HEADERS } from '../constants';

function Data (props) {
  let getSpy = props.getSpy
  let setSpy = props.setSpy
  let color = ''

  let newGame = () => {
    fetch(`${API_ROOT}/new-game`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({room: {id: props.room.id}})
    })
    .then(setSpy(false))
  }

  let gameOver = () => {
    fetch(`${API_ROOT}/game-over`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({room: {id: props.room.id}})
    })
  }

  let cardCounter = () => {
    let hash = props.room.cards.reduce((colorHash, card) => {
      if (card.team === 'red' || card.team === 'blue'){
        if (!card.clicked){
          colorHash[card.team] ? colorHash[card.team] += 1 : colorHash[card.team] = 1
        }
      }
      return colorHash
    }, {})
    if (!hash.red){
      hash.red = 0
      props.room.turn !== 'red win' && gameOver()
    }
    if (!hash.blue){
      hash.blue = 0
      props.room.turn !== 'blue win' && gameOver()
    }
    
    return hash
  }

  let nextTurn = () => {
    if (props.room.turn !== 'blue win' && props.room.turn !== 'red win' && props.user.team === props.room.turn){
      fetch(`${API_ROOT}/next-turn`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({room: {id: props.room.id}})
      })
    }
  }

  let turn = () => {
    switch(props.room.turn) {
      case 'red win':
        return 'Red Wins!'
      case 'blue win':
        return 'Blue Wins!'
      case 'red':
        return "Red's Turn"
      case 'blue':
        return "Blue's Turn"
      default:
        return "Game Over"
    }
  }

  
  if (props.room.turn.includes('red')){
    color = '#ef8362'
  } else if (props.room.turn.includes('blue')){
    color = '#ADD8E6'
  }
  
  return (
    <div style={{display: 'contents', textAlign: 'center'}}>
      <button className='spymaster' onClick={() => setSpy(!getSpy)}><span>{!getSpy ? 'Spymaster' : 'Field Agent'}</span></button>
      <div className='data'></div>
      <button className='next-turn' onClick={() => nextTurn()}><span>Next Turn</span></button>
      <button className='new-game' onClick={() => newGame()}><span>New Game</span></button>
      {props.room.start === 'red' ? 
        <div className='tally'><span><b style={{color: 'red'}}>{!!props.room.id && cardCounter().red}</b> - <b style={{color: 'blue'}}>{!!props.room.id && cardCounter().blue}</b></span></div> : 
        <div className='tally'><span><b style={{color: 'blue'}}>{!!props.room.id && cardCounter().blue}</b> - <b style={{color: 'red'}}>{!!props.room.id && cardCounter().red}</b></span></div>}
      <div className='turn' ><span style={{backgroundColor: color}}>{turn()}</span></div>
    </div>
  )
}

export default Data