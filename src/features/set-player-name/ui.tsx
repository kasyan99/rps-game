import { setUsername } from "entities/player"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { USER_NAME } from "./config"
import classes from "./styles.module.scss"

export const SetPlayerName: React.FC = () => {
   const dispatch = useDispatch()
   const [player, setPlayer] = useState('')

   const navigate = useNavigate()

   useEffect(() => {
      //get user from localStorage
      const storagedPlayer = localStorage.getItem(USER_NAME)

      if (storagedPlayer) {
         //store user name
         dispatch(setUsername(storagedPlayer))
      }
   }, [dispatch, navigate])


   const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setPlayer(e.target.value)

   const onSubmit = (e: React.FormEvent) => {

      e.preventDefault()

      //store user name 
      localStorage.setItem(USER_NAME, player)
      dispatch(setUsername(player))
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