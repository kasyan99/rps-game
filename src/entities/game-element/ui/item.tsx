import React from "react"
import { IGameElement } from "../types"
import classes from './styles.module.scss'

type Props = {
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   element: IGameElement
}

export const Item: React.FC<Props> = ({ element: { checked, disabled, img, value }, onChange }) => {
   return (
      <span className={classes.root}>
         <input onChange={onChange} type='radio' value={value} id={value} name='game-element' disabled={disabled} checked={checked} />
         <label htmlFor={value}>{value}<img src={img} alt={value} /></label>
      </span>
   )
}
