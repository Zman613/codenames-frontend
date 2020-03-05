import React from 'react'

function Home (props) {

  let joinHandle = () => {
    props.history.push("/join-room")
  }

  let createHandle = () => {
    props.history.push("/create-room")
  }

  let home = () => {
    props.history.push('/home')
  }
  
  console.log("hit home")
  return(
    <div>
      <img onClick={home} className='logo' src='/logo.png' alt='' />
    <div className='home'>
      <button className='home-button' id='join-button' onClick={joinHandle}>Join Room</button>
      <button className='home-button' id='create-button' onClick={createHandle}>Create Room</button>
    </div>
    </div>
  )
}

export default Home