import { useChannel } from "entities/player/model"
import { useEffect, useState } from "react"
import { Result, rpsApi } from "shared/api"
import { compareChoices } from "../lib/compare-choices"
import { Winner } from "../types"



const GameResults: React.FC = () => {

   const socket = useChannel()

   const [winner, setWinner] = useState<Winner>(null)
   const [results, setResults] = useState<Result[] | null>(null)

   useEffect(() => {
      socket && rpsApi.game.subscribeGameFinished(socket, (response) => {
         const win = compareChoices(response.results)
         setWinner(win)
         setResults(response.results)
      })
   }, [results, socket])

   if (!winner || !results) return null

   const [player1, player2] = results


   return (
      <div>Results:
         <div>{player1.username}: {player1.choice}</div>
         <div>{player2.username}: {player2.choice}</div>
         <div>
            <strong>
               {
                  winner === 'draw'
                     ? 'Draw'
                     : `Winner: ${winner.username}`
               }
            </strong>
         </div>
      </div>
   )
}

export default GameResults
