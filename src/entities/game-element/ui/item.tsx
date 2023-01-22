import React from "react"
import { GameElement } from "shared/api"

type Props = {
   value: GameElement
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   disabled: boolean
   checked: boolean | undefined
}

export const Item: React.FC<Props> = ({ value, onChange, disabled, checked }) => {
   return (
      <>
         <input onChange={onChange} type='radio' value={value} id={value} name='game-element' disabled={disabled} checked={checked} />
         <label htmlFor={value}>{value}</label>
      </>
   )
}
