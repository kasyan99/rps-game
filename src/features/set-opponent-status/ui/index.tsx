import Status from "entities/opponent/ui/status"
import { useChannel, useUsername } from "entities/player/model"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { rpsApi } from "shared/api"


export const SetOpponentStatus: React.FC = () => {

   const [isOnline, setIsOnline] = useState(false)
   const [isMadeChoice, setIsMadeChoice] = useState(false)

   //get from store
   const socket = useChannel()
   const username = useUsername()

   const dispatch = useDispatch()

   useEffect(() => {

      if (socket) {

         rpsApi.player.subscribePlayersReceived(socket, (players: string[]) => {
            if (players.length > 1) {
               setIsOnline(true)
            }
         })

         rpsApi.player.getPlayers(socket)

         rpsApi.player.subscribePlayersConnected(socket, ({ username }) => {
            console.log('conected', username);
            setIsOnline(true)
         })

         rpsApi.player.subscribePlayersDisconnected(socket, ({ username }) => {
            console.log('disconected', username)
            //to check value of players
            rpsApi.player.getPlayers(socket)
            setIsOnline(false)
         })

         rpsApi.game.subscribeOponentChoice(socket, ({ username }) => {
            console.log(username, 'made a choice');
            setIsMadeChoice(true)
         })
      }
   }, [dispatch, socket, username])

   return <Status isMadeChoice={isMadeChoice} isOnline={isOnline} />

}