import { GameResults } from "entities/game-results"
import { setIsShown, setWinner, useIsShown, useWinner } from "entities/game-results/model/results"
import { useChannel } from "entities/player/model"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Result, rpsApi } from "shared/api"
import { compareChoices } from "../lib"


const ShowGameResults: React.FC = () => {

   const socket = useChannel()

   const [results, setResults] = useState<Result[] | null>(null)

   const dispatch = useDispatch()

   //get from store
   const winner = useWinner()
   const isShown = useIsShown()
   useEffect(() => {
      if (socket) {
         rpsApi.game.subscribeGameFinished(socket, (response) => {
            console.log('game f');

            const win = compareChoices(response.results)
            setResults(response.results)
            dispatch(setWinner(win))

            dispatch(setIsShown(true))
         })

         rpsApi.game.subscribeOponentChoice(socket, () => {
            dispatch(setIsShown(false))
         })
      }
   }, [dispatch, results, socket])

   if (!winner || !results) return null

   const [player1, player2] = results


   if (!winner) return null

   return (
      <>
         {
            isShown
               ? <GameResults player1={player1} player2={player2} winner={winner} />
               : ''
         }
      </>

   )
}

export default ShowGameResults