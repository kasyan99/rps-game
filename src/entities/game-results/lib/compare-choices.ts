import { Result } from "shared/api"
import { Winner } from "entities/game-results"

export function compareChoices(results: Result[] | null) {
  let winner: Winner = null

  if (!results) return null
  if (results.length === 0) return null

  const [player1, player2] = results

  //array of choices for compare to find winner
  const choices = [player1.choice, player2.choice]

  let winnerIndex: number = -1

  if (player1.choice === player2.choice) {
    winnerIndex = -1
  }
  //paper beats rock
  else if (choices.includes("paper") && choices.includes("rock")) {
    //find index of winner (who chose paper)
    winnerIndex = choices.findIndex((choice) => choice === "paper")
  }
  //rock beats scissors
  else if (choices.includes("scissors") && choices.includes("rock")) {
    //find index of winner (who chose rock)
    winnerIndex = choices.findIndex((choice) => choice === "rock")
  }
  //scissors beats paper
  else if (choices.includes("scissors") && choices.includes("paper")) {
    //find index of winner (who chose scissors)
    winnerIndex = choices.findIndex((choice) => choice === "scissors")
  }

  winner = winnerIndex === -1 ? "draw" : results[winnerIndex]

  return winner
}
