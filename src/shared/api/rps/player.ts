import { io, Socket } from "socket.io-client"
import { GameElement, Username } from "./models"

export const openChannel = async (username: Username): Promise<Socket> => {
  const socket = io("http://localhost:4000", {
    query: { username },
  })

  return socket
}

export const makeChoice = (socket: Socket, element: GameElement) => {
  socket.emit("choose", element)
}

export const getPlayers = (socket: Socket) => {
  socket.emit("get_players")
}

export const subscribePlayersReceived = (socket: Socket) => {
  socket.on("players_received", (players: Username[]) => {
    console.log("players: ", players)
  })
}

export const subscribePlayersConnected = (socket: Socket) => {
  socket.on("connected", (username: Username) => {
    console.log("connected: ", username)
  })
}

export const subscribePlayersDisconnected = (socket: Socket) => {
  socket.on("disconnected", (username: Username) => {
    console.log("disconnected: ", username)
  })
}
