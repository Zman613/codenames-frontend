import React, {useEffect} from 'react'
import ClickVisibility from "../constants/ClickVisibility.js";

function AboutModal (props) {
  const { ref, getVisibility } = ClickVisibility(true)

  useEffect(() => {
    !getVisibility && props.setAbout(false)
  }, [getVisibility])

  return (
    <div className='modal' >
      <div className='about' ref={ref}>

        <button onClick={() => props.setabout(false)}>Close</button>
      </div>
    </div>
  )

}

export default AboutModal