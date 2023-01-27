import { useEffect } from "react"
import { Score, increaseUserScore, increaseOpponentScore, resetScore, useOpponentScore, useUserScore } from "entities/score"
import { rpsApi } from "shared/api"
import { useEvent } from "effector-react"
import { useWinner } from "entities/game-results"
import { useOpponent } from "entities/opponent"
import { useChannel, usePlayer } from "entities/player"

export const SetScore: React.FC = () => {

   //get from store
   const socket = useChannel()
   const username = usePlayer()

   const { name: opponentName } = useOpponent()
   const winner = useWinner()
   const opponentScore = useOpponentScore()
   const userScore = useUserScore()

   const handleIncreaseUserScore = useEvent(increaseUserScore)
   const handleIncreaseOpponentScore = useEvent(increaseOpponentScore)
   const handleResetScore = useEvent(resetScore)

   useEffect(() => {
      //no winner or draw -> do nothing
      if (!winner || winner === 'draw') {
         return void 0
      }
      //user is winner -> increase user score +1
      else if (winner.username === username) {
         handleIncreaseUserScore()
      }
      //opponent is winner -> increase opponent score +1
      else if (winner.username === opponentName) {
         handleIncreaseOpponentScore()
      }
   }, [handleIncreaseOpponentScore, handleIncreaseUserScore, opponentName, username, winner])

   useEffect(() => {
      if (socket) {
         rpsApi.player.subscribePlayersDisconnected(socket, () => {
            //reset score
            handleResetScore()
         })
      }
   }, [handleResetScore, socket])

   if (!opponentName || !username) return null

   return (
      <Score opponentName={opponentName} username={username} userScore={userScore} opponetScore={opponentScore} />
   )
}

