import { setChannel, useChannel, useUsername } from "entities/player/model"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { rpsApi } from "shared/api"
import { SetPlayerName } from "features/set-player-name"

const Auth: React.FC = () => {
   const dispatch = useDispatch()

   const navigate = useNavigate()

   const openedSocket = useChannel()
   const storagedPlayer = useUsername()

   useEffect(() => {

      //channel is not opened AND user is authorized
      // -> open channel and subscribe to all events
      if (!openedSocket && storagedPlayer) {
         const socket = rpsApi.player.openChannel(storagedPlayer)

         //store opened channel
         dispatch(setChannel(socket))

         navigate('/game-with-player')
      }

   }, [dispatch, navigate, openedSocket, storagedPlayer])

   return (
      <div>
         <SetPlayerName />
      </div>
   )
}
export default Auth