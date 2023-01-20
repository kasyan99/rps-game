import GameResults from "entities/game-results/ui"
import Opponent from "entities/opponent/ui"
import { Player } from "entities/player"
import { useChannel, useUsername } from "entities/player/model"
import { Score } from "entities/score"
import { GameElementSetter } from "features/game-element-setter"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { rpsApi } from "shared/api"

const GameWithPlayer: React.FC = () => {

   const socket = useChannel()

   const navigate = useNavigate()

   const [isOpponentOnline, setIsOpponentOnline] = useState(false)
   const [isMadeChoice, setIsMadeChoice] = useState(false)

   const [opponentName, setOpponentName] = useState<string | undefined>()

   const username = useUsername()

   useEffect(() => {
      if (!socket) {
         navigate('/')
      }
      if (socket) {
         rpsApi.player.subscribePlayersReceived(socket, (players: string[]) => {
            if (players.length > 1) {
               setIsOpponentOnline(true)
               const opponent = players.find(player => player !== username)
               setOpponentName(String(opponent))
            }

         })

         rpsApi.player.getPlayers(socket)

         rpsApi.player.subscribePlayersConnected(socket, ({ username }) => {
            console.log('conected', username);
            setIsOpponentOnline(true)
         })

         rpsApi.player.subscribePlayersDisconnected(socket, ({ username }) => {
            console.log('disconected', username);
            setIsOpponentOnline(false)
         })

         rpsApi.game.subscribeOponentChoice(socket, ({ username }) => {
            console.log(username, 'made a choice');
            setIsMadeChoice(true)
         })
      }

   }, [navigate, socket, username])

   if (!username) return null

   return (
      <div>
         <Score.Count />
         <Opponent name={opponentName} isOnline={isOpponentOnline} isMadeChoice={isMadeChoice} />
         <Player.Name name={username} />
         <GameElementSetter isOpponentOnline={isOpponentOnline} />
         <GameResults />
      </div>
   )
}

export default GameWithPlayer
