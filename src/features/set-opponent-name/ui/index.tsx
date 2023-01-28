import { useEvent } from "effector-react"
import { OpponentName, setOpponentName, useOpponent } from "entities/opponent"
import { useChannel, usePlayer } from "entities/player"
import { useEffect } from "react"
import { rpsApi } from "shared/api"

export const SetOpponentName: React.FC = () => {
   //get from store
   const socket = useChannel()
   const username = usePlayer()

   const { name: opponentName } = useOpponent()

   const onOpponentNameChanged = useEvent(setOpponentName)

   useEffect(() => {

      if (socket) {

         rpsApi.player.subscribePlayersReceived(socket, (players: string[]) => {
            if (players.length > 1) {
               //find opponent name
               const opponent = players.find(player => player !== username)
               onOpponentNameChanged(opponent)
            }
         })

         rpsApi.player.getPlayers(socket)
      }
   }, [onOpponentNameChanged, socket, username])

   return <OpponentName opponentName={opponentName} />
}
