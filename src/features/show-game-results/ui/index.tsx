import { GameResults, setIsShown, setWinner, useIsShown, useWinner } from "entities/game-results"
import { useEffect, useState } from "react"
import { Result, rpsApi } from "shared/api"
import { compareChoices } from "../lib"
import { useEvent } from "effector-react"
import { useChannel } from "entities/player"

export const ShowGameResults: React.FC = () => {

   const socket = useChannel()

   const [results, setResults] = useState<Result[] | null>(null)

   //get from store
   const isShown = useIsShown()
   const winner = useWinner()

   const onWinnerChanged = useEvent(setWinner)
   const onIsShownChanged = useEvent(setIsShown)

   useEffect(() => {
      if (socket) {
         rpsApi.game.subscribeGameFinished(socket, (response) => {
            //calculate winner
            const win = compareChoices(response.results)

            setResults(response.results)

            onWinnerChanged(win)

            //show results
            onIsShownChanged(true)
         })

         rpsApi.game.subscribeOponentChoice(socket, () => {
            //hide results
            onIsShownChanged(false)
         })
      }
   }, [onIsShownChanged, onWinnerChanged, results, socket])

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