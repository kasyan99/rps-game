import { resetElementsValue, setChosenElenment, useGameElements } from "entities/game-element";
import { Item } from "entities/game-element"
import { setIsShown } from "entities/game-results/model/results";
import { useChannel } from "entities/player/model";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GameElement, rpsApi } from "shared/api";

export const SetGameElement: React.FC = () => {

   const socket = useChannel()

   const dispatch = useDispatch()

   const gameElements = useGameElements()

   useEffect(() => {
      if (socket) {
         rpsApi.game.subscribeGameFinished(socket, () => {
            //reset elements(inputs) values
            dispatch(resetElementsValue())
         })
      }
   }, [dispatch, socket])

   if (!socket) return null

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
         {gameElements.map(element => <Item onChange={onChange} value={element.value} key={element.value} disabled={false} checked={element.checked} />)}
      </form>
   )
}