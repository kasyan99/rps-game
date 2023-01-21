import { Socket } from "socket.io-client"
import { IUser, Result } from "./models"

export const subscribeOponentChoice = (
  socket: Socket,
  handler: (player: IUser) => void
) => {
  socket.on("opponent_made_choice", handler)
}

export const subscribeGameFinished = (
  socket: Socket,
  handler: (response: { results: Result[] }) => void
) => {
  socket.on("game_finished", handler)
}
