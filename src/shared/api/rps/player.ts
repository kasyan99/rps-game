import { useState } from "react"
import { io, Socket } from "socket.io-client"
import { GameElement, IUser } from "./models"

export const openChannel = (username: string): Socket | null => {
  try {
    const socket = io("http://localhost:4000", {
      query: { username },
    })

    return socket
  } catch (error) {
    throw error
  }
}

export const makeChoice = (socket: Socket | null, element: GameElement) => {
  socket?.emit("choose", element)
}

export const getPlayers = (socket: Socket | null) => {
  socket?.emit("get_players")
}

export const usePlayersReceived = (socket: Socket | null) => {
  const [players, setPlayers] = useState<string[]>()

  try {
    socket?.on("players_received", (players) => {
      setPlayers(players)
    })
  } catch (error) {
    throw error
  }

  return players
}

export const usePlayersConnected = (socket: Socket | null) => {
  const [player, setPlayer] = useState<{ player: IUser }>()
  try {
    socket?.on("connected", (player) => {
      setPlayer(player)
    })
  } catch (error) {
    throw error
  }

  return player
}

export const usePlayersDisconnected = (socket: Socket | null) => {
  const [player, setPlayer] = useState<{ player: IUser }>()

  try {
    socket?.on("disconnected", (player) => {
      setPlayer(player)
    })
  } catch (error) {
    throw error
  }

  return player
}
