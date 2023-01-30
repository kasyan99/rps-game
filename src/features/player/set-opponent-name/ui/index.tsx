import { useEvent } from "effector-react"
import { OpponentName, setOpponentName, useOpponent, useChannel, usePlayer } from "entities/player"
import { useEffect } from "react"
import { rpsApi } from "shared/api"

export const SetOpponentName: React.FC = () => {
   //get from store
   const socket = useChannel()
   const username = usePlayer()

   const { name: opponentName } = useOpponent()

   const onOpponentNameChanged = useEvent(setOpponentName)

   const players = rpsApi.player.usePlayersReceived(socket)

   useEffect(() => {
      if (players && players.length > 1) {
         //find opponent name
         const opponent = players.find(player => player !== username)
         onOpponentNameChanged(opponent)
      }

      // rpsApi.player.getPlayers(socket)
   }, [onOpponentNameChanged, players, socket, username])

   useEffect(() => {
      rpsApi.player.getPlayers(socket)
   }, [socket])

   return <OpponentName opponentName={opponentName} />
}
