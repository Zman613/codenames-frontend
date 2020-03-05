import React, {useState, useEffect} from 'react'
import ClickVisibility from "../constants/ClickVisibility.js";

function Menu (props) {

  const [getMenu, setMenu] = useState(false)
  const { ref, getVisibility, setVisibility } = ClickVisibility(true)

  useEffect(() => {
    !getVisibility && setMenu(false)
  }, [getVisibility])

  return (
    <div className='menu'  >
      <span className="hamburger" onClick={() => {setMenu(!getMenu); setVisibility(true)}}  ></span>
      { !!getMenu &&
      <div className='menu-items' ref={ref} >
        <button onClick={() => {props.setHowTo(true); setMenu(false)}}> How To Play </button>
        <button onClick={() => {props.setSettings(true); setMenu(false)}}> Settings </button>
        <button onClick={() => {props.setAbout(true); setMenu(false)}}> About </button>
      </div>
      }
    </div>
  )
}

export default Menu

// onBlur={() => setMenu(!getMenu)} tabIndex='0'