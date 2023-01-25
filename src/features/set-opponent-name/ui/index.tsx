import { OpponentName, setOpponentName, useOpponentName } from "entities/opponent"
import { useChannel, useUsername } from "entities/player"
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
               //find opponent name
               const opponent = players.find(player => player !== username)
               dispatch(setOpponentName(opponent))
            }
         })

         rpsApi.player.getPlayers(socket)
      }
   }, [dispatch, socket, username])

   return <OpponentName opponentName={opponentName} />
}
