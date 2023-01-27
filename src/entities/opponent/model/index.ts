import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"

type OpponentInitialState = {
  name: string | undefined
}

const opponentInitialState: OpponentInitialState = {
  name: undefined,
}

export const setOpponentName = createEvent<string | undefined>()

const $opponent = createStore(opponentInitialState).on(
  setOpponentName,
  (state, name) => ({
    ...state,
    name,
  })
)

export const useOpponent = () => useStore($opponent)
