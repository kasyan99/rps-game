import React from "react"
import { GameElement } from "shared/api"

type Props = {
   value: GameElement
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   disabled: boolean
}

export const Item: React.FC<Props> = ({ value, onChange, disabled }) => {
   return (
      <>
         <input onChange={onChange} type='radio' value={value} id={value} name='game-element' disabled={disabled} />
         <label htmlFor={value}>{value}</label>
      </>
   )
}
