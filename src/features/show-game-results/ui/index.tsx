import {
   GameResults, setIsShown, setResults, useIsShown, useResults, useWinner
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
   // const results = useResults()

   const onIsShownChanged = useEvent(setIsShown)
   const onResultsChanged = useEvent(setResults)

   const results = rpsApi.game.useGameFinished(socket)

   useEffect(() => {
      if (results) {
         onResultsChanged(results)
      }
      //show results
      onIsShownChanged(true)
   }, [results, onIsShownChanged, onResultsChanged])

   const choice = rpsApi.game.useOpponentChoice(socket)

   useEffect(() => {
      //hide results
      onIsShownChanged(false)
   }, [choice, onIsShownChanged])

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