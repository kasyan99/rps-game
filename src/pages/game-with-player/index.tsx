
import { Player } from "entities/player"
import { useChannel, useUsername } from "entities/player/model"
import { SetGameElement } from "features/set-game-element"
import { SetScore } from "features/set-score"
import ShowGameResults from "features/show-game-results/ui"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Opponent } from "widgets/opponent"

const GameWithPlayer: React.FC = () => {
   //get from store
   const socket = useChannel()
   const username = useUsername()

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
