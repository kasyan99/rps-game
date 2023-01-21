import { useChannel } from "entities/player/model"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Result, rpsApi } from "shared/api"
import { compareChoices } from "../lib/compare-choices"
import { setWinner, useWinner } from "../model/results"

const GameResults: React.FC = () => {

   const socket = useChannel()

   // const [winner, setWinner] = useState<Winner>(null)
   const [results, setResults] = useState<Result[] | null>(null)

   const dispatch = useDispatch()

   //get from store
   const winner = useWinner()

   useEffect(() => {
      if (socket) {
         rpsApi.game.subscribeGameFinished(socket, (response) => {
            console.log('game f');

            const win = compareChoices(response.results)
            setResults(response.results)
            dispatch(setWinner(win))
         })
      }
   }, [dispatch, results, socket])

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