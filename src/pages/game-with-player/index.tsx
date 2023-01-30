import { Player, useChannel, usePlayer } from "entities/player"
import { SetGameElement, SetScore, ShowGameResults } from "features/game"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Opponent } from "widgets/opponent"

const GameWithPlayer: React.FC = () => {
   //get from store
   const socket = useChannel()
   const username = usePlayer()

   const navigate = useNavigate()


   useEffect(() => {

      if (!socket) {
         navigate('/')
      }

      return () => {
         //unsubscribe from all events
         socket?.offAny()
         //close socket
         socket?.close()
      }

   }, [navigate, socket])

   if (!username || !socket) return null

   return (
      <div>
         <SetScore />
         <Opponent />
         <Player />
         <SetGameElement />
         <ShowGameResults />
      </div>
   )
}

export default GameWithPlayer
