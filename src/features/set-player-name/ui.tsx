import { setUsername } from "entities/player/model"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { USER_NAME } from "./config"

export const SetPlayerName: React.FC = () => {
   const dispatch = useDispatch()
   const [player, setPlayer] = useState('')

   const navigate = useNavigate()

   useEffect(() => {
      const storagedPlayer = localStorage.getItem(USER_NAME)

      if (storagedPlayer) {
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
      <form onSubmit={onSubmit}>
         <input
            value={player}
            onChange={onChangeName}
            type='text' placeholder="Enter you nickname..." />
         <button type="submit">Ok</button>
      </form>
   )
}