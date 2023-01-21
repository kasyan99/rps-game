import { useWinner } from "entities/game-results/model/results"
import { useOpponentName } from "entities/opponent"
import { useUsername } from "entities/player/model"
import { Score } from "entities/score"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { increaseOpponentScore, increaseUserScore, useOpponentScore, useUserScore } from "entities/score/model"

export const SetScore: React.FC = () => {

   const username = useUsername()
   const opponentName = useOpponentName()

   const userScore = useUserScore()
   const opponetScore = useOpponentScore()

   const winner = useWinner()

   const dispatch = useDispatch()

   useEffect(() => {
      //no winner or draw -> do nothing
      if (!winner || winner === 'draw') {
         return void 0
      }
      //user is winner -> increase user score +1
      else if (winner.username === username) {
         dispatch(increaseUserScore())
      }
      //opponent is winner -> increase opponent score +1
      else if (winner.username === opponentName) {
         dispatch(increaseOpponentScore())
      }
   }, [dispatch, opponentName, username, winner])

   if (!opponentName || !username) return null

   return (
      <Score opponentName={opponentName} username={username} userScore={userScore} opponetScore={opponetScore} />
   )
}

