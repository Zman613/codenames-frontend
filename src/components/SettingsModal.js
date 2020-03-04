import React, {useEffect} from 'react'
import ClickVisibility from "../constants/ClickVisibility.js";

function SettingsModal (props) {
  const { ref, getVisibility } = ClickVisibility(true)

  useEffect(() => {
    !getVisibility && props.setSettings(false)
  }, [getVisibility])

  return (
    <div className='modal' >
      <div className='settings' ref={ref}>
      <button onClick={props.deleteRoom} style={{background: 'red'}}  type="button">Delete Room</button>
        <button onClick={() => props.setSettings(false)}>Close</button>
      </div>
    </div>
  )

}

export default SettingsModal