import { setChannel, useChannel, usePlayer } from "entities/player"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { rpsApi } from "shared/api"
import { SetPlayerName } from "features/player"
import { useEvent } from "effector-react"

const Auth: React.FC = () => {
   const navigate = useNavigate()

   const openedSocket = useChannel()
   const storagedPlayer = usePlayer()

   const onChannelChanged = useEvent(setChannel)

   useEffect(() => {

      //channel is not opened AND user is authorized
      // -> open channel and subscribe to all events
      if (!openedSocket && storagedPlayer) {
         const socket = rpsApi.player.openChannel(storagedPlayer)

         //store opened channel
         onChannelChanged(socket)

         navigate('/game-with-player')
      }

   }, [navigate, onChannelChanged, openedSocket, storagedPlayer])

   return (
      <div>
         <SetPlayerName />
      </div>
   )
}
export default Auth