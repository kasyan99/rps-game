import { useChannel, useUsername } from "entities/player/model"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { rpsApi } from "shared/api"
import { setOpponentName, useOpponentName } from "../model"
import Status from "./status"

const Opponent: React.FC = () => {

   const [isOnline, setIsOnline] = useState(false)
   const [isMadeChoice, setIsMadeChoice] = useState(false)
   // const [opponentName, setOpponentName] = useState<string | undefined>()

   //get from store
   const socket = useChannel()
   const username = useUsername()
   const opponentName = useOpponentName()

   const dispatch = useDispatch()

   useEffect(() => {

      if (socket) {

         rpsApi.player.subscribePlayersReceived(socket, (players: string[]) => {
            if (players.length > 1) {
               setIsOnline(true)
               const opponent = players.find(player => player !== username)
               dispatch(setOpponentName(opponent))
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
   }, [socket, username])

   return (
      <div>Opponent: {opponentName}
         {
            opponentName ?
               <Status isMadeChoice={isMadeChoice} isOnline={isOnline} />
               : ' -'
         }
      </div>
   )
}

export default Opponent
