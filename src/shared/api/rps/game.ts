import { Socket } from "socket.io-client"
import { Result, Username } from "./models"

export const subscribeOponentChoice = (socket: Socket) => {
  socket.on("opponent_made_choice", (username: Username) => {
    console.log("opponent_made_choice: ", username)
  })
}

export const subscribeGameFinished = (socket: Socket) => {
  socket.on("game_finished", (results: Result[]) => {
    console.log("game_finished: ", results)
  })
}
