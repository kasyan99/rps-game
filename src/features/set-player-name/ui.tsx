import { useEvent } from "effector-react"
import { setUsernameFx } from "entities/player"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./styles.module.scss"

export const SetPlayerName: React.FC = () => {

   const [player, setPlayer] = useState('')

   const navigate = useNavigate()

   const onUserNameChanged = useEvent(setUsernameFx)

   useEffect(() => {
      //set user name if it exist
      onUserNameChanged(null)
   }, [navigate, onUserNameChanged])


   const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setPlayer(e.target.value)

   const onSubmit = (e: React.FormEvent) => {

      e.preventDefault()

      //store user name 
      onUserNameChanged(player)
   }

   return (
      <form onSubmit={onSubmit} className={classes.form}>
         <input
            value={player}
            onChange={onChangeName}
            type='text' placeholder="Enter you nickname..." />
         <button type="submit">Ok</button>
      </form>
   )
}