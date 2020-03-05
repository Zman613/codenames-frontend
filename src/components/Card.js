import React from 'react'

function Card (props) {
  
  let defaultImageText = '/0001.jpg'
  let spyBackground = 'none'

  if (!!props.clicked){
    switch (props.team) {
      case 'red':
        defaultImageText = '/RedAgent02.png'
        break;
      case 'blue':
        defaultImageText = '/BlueAgent01.png'
        break;
      case 'innocent':
        defaultImageText = '/Innocent01.png'
        break;
      case 'assassin':
        defaultImageText = '/spy.jpg'
        break;
      default:
        defaultImageText = '/0001.jpg'
        break;
    }
  }
  if (!!props.spy){
    switch (props.team) {
      case 'red':
        spyBackground = '#ef8362'
        break;
      case 'blue':
        spyBackground = '#ADD8E6'
        break;
      case 'innocent':
        spyBackground = '#FFE4C4'
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
    <div  onClick={() => props.handleClick(props.id, props.clicked)} style={{textAlign: 'center', position: 'relative'}}>
      {props.clicked && <img className='cover' alt='' src={defaultImageText} style={{width: '86px', borderRadius: '5px', zIndex: '5', position: 'absolute'}} />}
      <img alt='' src={'/0001.jpg'} style={{width: '86px', borderRadius: '5px'}} />
        <div style={{transform: 'translate(-50%, -50%)', position: 'absolute', top: '65%', left: '50%', background: spyBackground, whiteSpace: 'nowrap', fontSize: '0.8rem'}}>{props.word.toUpperCase()}</div>
    </div>
  )

}

export default Card