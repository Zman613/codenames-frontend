import React, {useEffect} from 'react'
import ClickVisibility from "../constants/ClickVisibility.js";

function HowToModal (props) {
  const { ref, getVisibility } = ClickVisibility(true)

  useEffect(() => {
    !getVisibility && props.setHowTo(false)
  }, [getVisibility])

  return (
    <div className='modal' >
      <div className='how-to' ref={ref}>
        <h2>How To Play</h2>
        <i>Simplified Rules</i>
        <p>Spymasters know the secret identities of 25 agents. Their teammates know the agents only by their
codenames.
Spymasters take turns giving one-word clues. A clue may relate to multiple words on the table. The field
operatives try to guess which words their spymaster meant. When a field operative touches a word, the
spymaster reveals its secret identity. If the field operatives guess correctly, they may continue guessing,
until they run out of ideas for the given clue or until they hit a wrong person. Then it is the other team's
turn to give a clue and guess. The first team to contact all their agents wins the game. Or the team that contacts the assassin instantly loses.</p>
      <p>To play: Join a team by clicking on either the Blue Team button or the Red Team Button. One person on each team becomes Spymaster by clicking on the Spymaster button. When it is your teams turn you can click on the board to 'guess'. If you got all the cards of that clue, click the Next Turn button to end your turn. To start a new game click the New Game Button. </p>
        <button onClick={() => props.setHowTo(false)}>Close</button>
      </div>
    </div>
  )

}

export default HowToModal