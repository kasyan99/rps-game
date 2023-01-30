import { useState } from "react"
import { io, Socket } from "socket.io-client"
import { GameElement, IUser } from "./models"

export const openChannel = (username: string): Socket => {
  const socket = io("http://localhost:4000", {
    query: { username },
  })

  return socket
}

export const makeChoice = (socket: Socket, element: GameElement) => {
  socket.emit("choose", element)
}

export const getPlayers = (socket: Socket | null) => {
  if (socket) socket.emit("get_players")
}

export const usePlayersReceived = (socket: Socket | null) => {
  const [players, setPlayers] = useState<string[]>()
  if (socket) {
    socket.on("players_received", (players) => {
      setPlayers(players)
    })
  }

  return players
}

export const usePlayersConnected = (socket: Socket | null) => {
  const [player, setPlayer] = useState<{ player: IUser }>()
  if (socket) {
    socket.on("connected", (player) => {
      setPlayer(player)
    })
  }
  return player
}

export const usePlayersDisconnected = (socket: Socket | null) => {
  const [player, setPlayer] = useState<{ player: IUser }>()
  if (socket) {
    socket.on("disconnected", (player) => {
      setPlayer(player)
    })
  }
  return player
}
