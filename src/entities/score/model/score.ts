import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

export const increaseUserScore = createEvent()
export const increaseOpponentScore = createEvent()
export const resetScore = createEvent()

const $userScore = createStore(0)
  .on(increaseUserScore, (score) => score + 1)
  .on(resetScore, () => 0)

const $opponentScore = createStore(0)
  .on(increaseOpponentScore, (score) => score + 1)
  .on(resetScore, () => 0)

export const useUserScore = () => useStore($userScore)
export const useOpponentScore = () => useStore($opponentScore)
