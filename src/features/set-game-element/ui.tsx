import { resetElementsValue, setChosenElenment, setDisabled, useDisabled, useGameElements } from "entities/game-element";
import { Item } from "entities/game-element"
import { setIsShown } from "entities/game-results";
import { useChannel } from "entities/player";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GameElement, rpsApi } from "shared/api";

export const SetGameElement: React.FC = () => {

   const socket = useChannel()

   const dispatch = useDispatch()

   const gameElements = useGameElements()

   const disabled = useDisabled()

   useEffect(() => {
      if (socket) {
         rpsApi.game.subscribeGameFinished(socket, () => {
            //reset elements(inputs) values
            dispatch(resetElementsValue())
         })

         rpsApi.player.subscribePlayersReceived(socket, (players: string[]) => {
            if (players.length < 2) {
               dispatch(setDisabled(true))
            } else {
               dispatch(setDisabled(false))
            }
         })
      }
   }, [dispatch, socket])

   if (!socket) return <div>Loading...</div>

   //make a choice
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as GameElement

      //choose the element
      dispatch(setChosenElenment(value))
      //send the choice
      rpsApi.player.makeChoice(socket, value)
      //hide the results
      dispatch(setIsShown(false))
   }

   return (
      <form>
         {gameElements.map(element => <Item
            onChange={onChange}
            value={element.value}
            key={element.value}
            disabled={disabled}
            checked={element.checked}
            img={element.img}
         />)}
      </form>
   )
}