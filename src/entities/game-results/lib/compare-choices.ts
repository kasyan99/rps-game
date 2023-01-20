import { Result } from "shared/api"
import { Winner } from "../types"

export function compareChoices(results: Result[]) {
  let winner: Winner = null

  console.log("-results", results)

  if (results.length === 0) return null
  const [player1, player2] = results

  const choices = [player1.choice, player2.choice]

  let winnerIndex: number = -1

  if (player1.choice === player2.choice) {
    winnerIndex = -1
  } else if (choices.includes("paper") && choices.includes("rock")) {
    winnerIndex = choices.findIndex((choice) => choice === "paper")
  } else if (choices.includes("scissors") && choices.includes("rock")) {
    winnerIndex = choices.findIndex((choice) => choice === "rock")
  } else if (choices.includes("scissors") && choices.includes("paper")) {
    winnerIndex = choices.findIndex((choice) => choice === "scissors")
  }

  winner = winnerIndex === -1 ? "draw" : results[winnerIndex]

  return winner
}
