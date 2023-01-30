import { Status } from "entities/opponent"
import { useChannel } from "entities/player"
import { useEffect, useState } from "react"
import { rpsApi } from "shared/api"


export const SetOpponentStatus: React.FC = () => {

   const [isOnline, setIsOnline] = useState(false)
   const [isMadeChoice, setIsMadeChoice] = useState(false)

   //get from store
   const socket = useChannel()

   const results = rpsApi.game.useGameFinished(socket)

   useEffect(() => {
      setIsMadeChoice(false)
   }, [results])

   const choice = rpsApi.game.useOpponentChoice(socket)

   useEffect(() => {
      //set status 'made a choice'
      if (choice?.player) {
         setIsMadeChoice(true)
      }
   }, [choice])

   const players = rpsApi.player.usePlayersReceived(socket)

   useEffect(() => {
      if (players && players.length > 1) {
         //set status online/offline
         setIsOnline(true)
      }
   }, [players])

   //get players
   useEffect(() => {
      rpsApi.player.getPlayers(socket)
   }, [socket])

   const connetcedPlayer = rpsApi.player.usePlayersConnected(socket)

   useEffect(() => {
      //set status online/offline
      setIsOnline(true)
   }, [connetcedPlayer])

   const disconnetcedPlayer = rpsApi.player.usePlayersDisconnected(socket)

   useEffect(() => {
      //set status online/offline
      setIsOnline(false)
   }, [disconnetcedPlayer])

   return <Status isMadeChoice={isMadeChoice} isOnline={isOnline} />

}