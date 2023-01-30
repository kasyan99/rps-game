import { useState } from "react"
import { Socket } from "socket.io-client"
import { IUser, Result } from "./models"

export const useGameFinished = (socket: Socket | null) => {
  const [results, setResults] = useState<Result[]>()
  try {
    socket?.on("game_finished", (response: { results: Result[] }) => {
      setResults(response.results)
    })
  } catch (error) {
    throw error
  }

  return results
}

export const useOpponentChoice = (socket: Socket | null) => {
  const [choice, setChoice] = useState<{ player: IUser }>()
  try {
    socket?.on("opponent_made_choice", (player: IUser) => {
      setChoice({ player })
    })
  } catch (error) {
    throw error
  }

  return choice
}
