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
        <h2>About</h2>
        <p> The motivation behind the project is I loved playing codenames with my family and building this allows me to play with them wherever we are. - Zalmy Muskal.</p><p> Created by Zalmy Muskal as a final project at Flatiron School Manhattan.</p>
        <button onClick={() => props.setabout(false)}>Close</button>
      </div>
    </div>
  )

}

export default AboutModal