import { setChannel, setUsername, useChannel } from "entities/player/model"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { rpsApi } from "shared/api"
import { Socket } from "socket.io-client"

const Auth: React.FC = () => {
   const USER_NAME = 'USER-NAME'
   const dispatch = useDispatch()
   const [player, setPlayer] = useState('')

   const navigate = useNavigate()

   const storedSocket = useChannel()

   useEffect(() => {
      const storagedPlayer = localStorage.getItem(USER_NAME)

      if (storagedPlayer) {

         const socket = storedSocket ? storedSocket : rpsApi.player.openChannel(storagedPlayer)


         subscribeToAllChannelEvents(socket)

         dispatch(setChannel(socket))
         dispatch(setUsername(storagedPlayer))
         navigate('/game-with-player')
      }

   }, [dispatch, navigate, storedSocket])

   const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setPlayer(e.target.value)

   const onSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      localStorage.setItem(USER_NAME, player)

      const socket = rpsApi.player.openChannel(player)

      subscribeToAllChannelEvents(socket)

      dispatch(setChannel(socket))
      dispatch(setUsername(player))

      navigate('/game-with-player')
   }

   const subscribeToAllChannelEvents = (socket: Socket) => {
      rpsApi.player.subscribePlayersConnected(socket)
      rpsApi.player.subscribePlayersDisconnected(socket)
      rpsApi.player.subscribePlayersReceived(socket)

      rpsApi.game.subscribeOponentChoice(socket)
      rpsApi.game.subscribeGameFinished(socket)
   }

   return (
      <div>
         <form onSubmit={onSubmit}>
            <input
               value={player}
               onChange={onChangeName}
               type='text' placeholder="Enter you nickname..." />
            <button type="submit">Ok</button>
         </form>
      </div>
   )
}
export default Auth
