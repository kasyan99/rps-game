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

export const getPlayers = (socket: Socket) => {
  socket.emit("get_players")
}

export const subscribePlayersReceived = (
  socket: Socket,
  handler: (players: string[]) => void
) => {
  // socket.on("players_received", (players: Username[]) => {
  //   console.log("players: ", players)
  // })
  socket.on("players_received", handler)
}

export const subscribePlayersConnected = (
  socket: Socket,
  handler: (player: IUser) => void
) => {
  //   socket.on("connected", (username: Username) => {
  //     console.log("connected: ", username)
  //   })
  socket.on("connected", handler)
}

export const subscribePlayersDisconnected = (
  socket: Socket,
  handler: (player: IUser) => void
) => {
  // socket.on("disconnected", (username: Username) => {
  //   console.log("disconnected: ", username)
  // })
  socket.on("disconnected", handler)
}
