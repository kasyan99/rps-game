
import { Player } from "entities/player"
import { useChannel, useUsername } from "entities/player/model"
import { GameElementSetter } from "features/game-element-setter"
import { SetScore } from "features/set-score"
import ShowGameResults from "features/show-game-results/ui"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Opponent } from "widgets/opponent"

const GameWithPlayer: React.FC = () => {

   const socket = useChannel()

   const navigate = useNavigate()

   const username = useUsername()

   useEffect(() => {

      if (!socket) {
         navigate('/')
      }

   }, [navigate, socket])

   if (!username || !socket) return null

   return (
      <div>
         <SetScore />
         <Opponent />
         <Player />
         <GameElementSetter />
         <ShowGameResults />
      </div>
   )
}

export default GameWithPlayer
