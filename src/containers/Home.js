import React from 'react'

function Home (props) {

  let joinHandle = () => {
    props.history.push("/join-room")
  }

  let createHandle = () => {
    props.history.push("/create-room")
  }
  console.log("hit home")
  return(
    <>
      <button onClick={joinHandle}>Join Room</button>
      <button onClick={createHandle}>Create Room</button>
    </>
  )
}

export default Home