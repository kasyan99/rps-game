import { useEvent } from "effector-react";
import { resetElementsValue, setChosenElenment, setDisabled, useGameElements } from "entities/game";
import { Item } from "entities/game"
import { setIsShown } from "entities/game";
import React, { useEffect } from "react";
import { GameElement, rpsApi } from "shared/api";
import { useChannel } from "entities/player";

export const SetGameElement: React.FC = () => {

   const socket = useChannel()

   const gameElements = useGameElements()

   const onIsShownChanged = useEvent(setIsShown)
   const onDisabledChanged = useEvent(setDisabled)
   const onElementChanged = useEvent(setChosenElenment)
   const onResetElementsValue = useEvent(resetElementsValue)

   const results = rpsApi.game.useGameFinished(socket)

   useEffect(() => {
      onResetElementsValue()
   }, [onResetElementsValue, results])

   const players = rpsApi.player.usePlayersReceived(socket)

   useEffect(() => {
      if (players && players.length < 2) {
         onDisabledChanged(true)
      } else {
         onDisabledChanged(false)
      }
   }, [onDisabledChanged, players])

   if (!socket) return <div>Loading...</div>

   //make a choice
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as GameElement

      //choose the element
      onElementChanged(value)
      //send the choice
      rpsApi.player.makeChoice(socket, value)
      //hide the results
      onIsShownChanged(false)
   }

   return (
      <form>
         {gameElements.map(element => <Item
            onChange={onChange}
            key={element.value}
            element={element}
         />)}
      </form>
   )
}