import { useEffect } from "react"
import {
   Score,
   increaseUserScore,
   increaseOpponentScore,
   resetScore,
   useOpponentScore,
   useUserScore,
   useWinner
} from "entities/game"
import { rpsApi } from "shared/api"
import { useEvent } from "effector-react"
import { useChannel, usePlayer, useOpponent } from "entities/player"

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

   const disconnetcedPlayer = rpsApi.player.usePlayersDisconnected(socket)

   useEffect(() => {
      //reset score
      handleResetScore()
   }, [handleResetScore, disconnetcedPlayer])

   if (!opponentName || !username) return null

   return (
      <Score opponentName={opponentName} username={username} userScore={userScore} opponetScore={opponentScore} />
   )
}

