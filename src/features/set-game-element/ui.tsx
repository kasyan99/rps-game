import { Item } from "entities/game-element/ui"
import { setIsShown } from "entities/game-results/model/results";
import { useChannel } from "entities/player/model";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GameElement, rpsApi } from "shared/api";
import { initialGameElements } from "./config"

export const SetGameElement: React.FC = () => {

   const socket = useChannel()

   const [gameElements, setGameElements] = useState(initialGameElements)

   const dispatch = useDispatch()

   useEffect(() => {
      if (socket) {
         rpsApi.game.subscribeGameFinished(socket, () => {
            //reset inputs value
            setGameElements(elems => elems.map(elem => {
               const newElem = { ...elem }
               newElem.checked = false
               return newElem
            }))
         })
      }
   }, [socket])

   if (!socket) return null

   //make a choice
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGameElements(elems => elems.map(elem => {
         //to choose element 
         if (elem.value === e.target.value) {
            const newElem = { ...elem }
            newElem.checked = true
            return newElem
         }
         return elem
      }))
      rpsApi.player.makeChoice(socket, e.target.value as GameElement)
      dispatch(setIsShown(false))
   }



   return (
      <form>
         {gameElements.map(element => <Item onChange={onChange} value={element.value} key={element.value} disabled={false} checked={element.checked} />)}
      </form>
   )
}