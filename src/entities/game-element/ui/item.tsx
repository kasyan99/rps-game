import React from "react"
import { GameElement } from "shared/api"
import classes from './styles.module.scss'

type Props = {
   value: GameElement
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   disabled: boolean
   checked: boolean
   img: string
}

export const Item: React.FC<Props> = ({ value, onChange, disabled, checked, img }) => {
   return (
      <span className={classes.root}>
         <input onChange={onChange} type='radio' value={value} id={value} name='game-element' disabled={disabled} checked={checked} />
         <label htmlFor={value}>{value}<img src={img} alt={value} /></label>
      </span>
   )
}
