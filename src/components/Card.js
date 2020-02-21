import React, {useState, useEffect} from 'react'

function Card (props) {
  
  let defaultImageText = '/0001.jpg'
  let spyBackground = 'none'

  if (!!props.clicked){
    switch (props.team) {
      case 'red':
        defaultImageText = '/RedAgent.png'
        break;
      case 'blue':
        defaultImageText = '/BlueAgent.png'
        break;
      case 'innocent':
        defaultImageText = '/Innocent.png'
        break;
      case 'assassin':
        defaultImageText = '/Assassin.png'
        break;
      default:
        defaultImageText = '/0001.jpg'
        break;
    }
  }
  if (!!props.spy){
    switch (props.team) {
      case 'red':
        spyBackground = 'red'
        break;
      case 'blue':
        spyBackground = 'blue'
        break;
      case 'innocent':
        spyBackground = 'orange'
        break;
      case 'assassin':
        spyBackground = 'gray'
        break;
      default:
        spyBackground = 'none'
        break;
    }
  }
  
  return(
    <div onClick={() => props.handleClick(props.id)} style={{textAlign: 'center', position: 'relative'}}>
      <img alt='' src={defaultImageText} style={{width: '94px'}} />
        {!props.clicked && <div style={{transform: 'translate(-50%, -50%)', position: 'absolute', top: '63%', left: '50%', background: spyBackground}}>{props.word}</div>}
    </div>
  )

}

export default Card