import {
   GameResults, setIsShown, setResults, setWinner, useIsShown, useResults, useWinner
} from "entities/game-results"
import { useEffect } from "react"
import { rpsApi } from "shared/api"
import { useEvent } from "effector-react"
import { useChannel } from "entities/player"

export const ShowGameResults: React.FC = () => {

   const socket = useChannel()

   //get from store
   const isShown = useIsShown()
   const winner = useWinner()
   const results = useResults()

   const onWinnerChanged = useEvent(setWinner)
   const onIsShownChanged = useEvent(setIsShown)
   const onResultsChanged = useEvent(setResults)

   useEffect(() => {
      if (socket) {
         rpsApi.game.subscribeGameFinished(socket, (response) => {
            onResultsChanged(response.results)
            //show results
            onIsShownChanged(true)
         })

         rpsApi.game.subscribeOponentChoice(socket, () => {
            //hide results
            onIsShownChanged(false)
         })
      }
   }, [onIsShownChanged, onResultsChanged, onWinnerChanged, results, socket])

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