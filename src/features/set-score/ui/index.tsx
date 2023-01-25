import { useWinner } from "entities/game-results"
import { useOpponentName } from "entities/opponent"
import { useChannel, useUsername } from "entities/player"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Score, increaseOpponentScore, increaseUserScore, resetScore, useOpponentScore, useUserScore } from "entities/score"
import { rpsApi } from "shared/api"

export const SetScore: React.FC = () => {

   //get from store
   const username = useUsername()
   const opponentName = useOpponentName()

   const userScore = useUserScore()
   const opponetScore = useOpponentScore()

   const winner = useWinner()

   const dispatch = useDispatch()

   const socket = useChannel()

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

   useEffect(() => {
      if (socket) {
         rpsApi.player.subscribePlayersDisconnected(socket, () => {
            //reset score
            dispatch(resetScore())
         })
      }
   }, [dispatch, socket])

   if (!opponentName || !username) return null

   return (
      <Score opponentName={opponentName} username={username} userScore={userScore} opponetScore={opponetScore} />
   )
}

