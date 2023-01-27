import { Status } from "entities/opponent"
import { useChannel, usePlayer } from "entities/player"
import { useEffect, useState } from "react"
import { rpsApi } from "shared/api"


export const SetOpponentStatus: React.FC = () => {

   const [isOnline, setIsOnline] = useState(false)
   const [isMadeChoice, setIsMadeChoice] = useState(false)

   //get from store
   const socket = useChannel()
   const username = usePlayer()

   useEffect(() => {

      if (socket) {

         rpsApi.player.subscribePlayersReceived(socket, (players: string[]) => {
            if (players.length > 1) {
               //set status online/offline
               setIsOnline(true)
            }
         })

         rpsApi.player.getPlayers(socket)

         rpsApi.player.subscribePlayersConnected(socket, ({ username }) => {
            //set status online/offline
            setIsOnline(true)
         })

         rpsApi.player.subscribePlayersDisconnected(socket, ({ username }) => {
            //to check value of players
            rpsApi.player.getPlayers(socket)
            //set status online/offline
            setIsOnline(false)
         })

         rpsApi.game.subscribeOponentChoice(socket, ({ username }) => {
            //set status 'made a choice'
            setIsMadeChoice(true)
         })

         rpsApi.game.subscribeGameFinished(socket, () => {
            //reset status 'made a choice'
            setIsMadeChoice(false)
         })
      }
   }, [socket, username])

   return <Status isMadeChoice={isMadeChoice} isOnline={isOnline} />

}