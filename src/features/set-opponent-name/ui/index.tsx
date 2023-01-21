import { OpponentName, setOpponentName, useOpponentName } from "entities/opponent"
import { useChannel, useUsername } from "entities/player/model"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { rpsApi } from "shared/api"

export const SetOpponentName: React.FC = () => {
   //get from store
   const socket = useChannel()
   const username = useUsername()
   const opponentName = useOpponentName()

   const dispatch = useDispatch()

   useEffect(() => {

      if (socket) {

         rpsApi.player.subscribePlayersReceived(socket, (players: string[]) => {
            if (players.length > 1) {
               const opponent = players.find(player => player !== username)
               dispatch(setOpponentName(opponent))
            }
         })

         rpsApi.player.getPlayers(socket)
      }
   }, [dispatch, socket, username])

   if (!opponentName) return null

   return <OpponentName opponentName={opponentName} />
}
