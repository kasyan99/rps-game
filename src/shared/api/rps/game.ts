import { useState } from "react"
import { Socket } from "socket.io-client"
import { IUser, Result } from "./models"

export const useGameFinished = (socket: Socket | null) => {
  const [results, setResults] = useState<Result[]>()
  if (socket) {
    socket.on("game_finished", (response: { results: Result[] }) => {
      setResults(response.results)
    })
  }

  return results
}

export const useOpponentChoice = (socket: Socket | null) => {
  const [choice, setChoice] = useState<{ player: IUser }>()
  if (socket) {
    socket.on("opponent_made_choice", (player: IUser) => {
      setChoice({ player })
    })
  }

  return choice
}
