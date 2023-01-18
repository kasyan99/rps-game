import React from "react"
import { GameElement } from "shared/api"

type Props = {
   value: GameElement
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Item: React.FC<Props> = ({ value, onChange }) => {
   return (
      <>
         <input onChange={onChange} type='radio' value={value} id={value} name='game-element' />
         <label htmlFor={value}>{value}</label>
      </>
   )
}
