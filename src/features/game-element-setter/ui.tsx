import { Item } from "entities/game-element/ui"
import { useChannel } from "entities/player/model";
import React from "react";
import { GameElement, rpsApi } from "shared/api";
import { elementValues } from "./config"


type Props = {
   isOpponentOnline: boolean
}

export const GameElementSetter: React.FC<Props> = ({ isOpponentOnline }) => {
   const socket = useChannel()
   if (!socket) return null
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      rpsApi.player.makeChoice(socket, e.target.value as GameElement)
   }
   return (
      <form>
         {elementValues.map(value => <Item onChange={onChange} value={value} key={value} disabled={!isOpponentOnline} />)}
      </form>
   )
}