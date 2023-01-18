import { Player } from "entities/player"
import { useChannel } from "entities/player/model"
import { Score } from "entities/score"
import { GameElementSetter } from "features/game-element-setter"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GameWithPlayer: React.FC = () => {

   const socket = useChannel()

   const navigate = useNavigate()

   useEffect(() => {
      if (!socket) {
         navigate('/')
      }
   }, [navigate, socket])

   return (
      <div>
         <Score.Count />
         <div>Opponent</div>
         <Player.Name />
         <GameElementSetter />
      </div>
   )
}

export default GameWithPlayer
