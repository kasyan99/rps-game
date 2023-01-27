import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { Result } from "shared/api"
import { Winner } from "../types"

export const setResults = createEvent<Result[]>()
export const setWinner = createEvent<Winner>()
export const setIsShown = createEvent<boolean>()

const $results = createStore<Result[] | null>(null).on(
  setResults,
  (_, results) => results
)

const $winner = createStore<Winner>(null).on(setWinner, (_, winner) => winner)

const $isShown = createStore(false).on(setIsShown, (_, isShown) => isShown)

export const useResults = () => useStore($results)
export const useWinner = () => useStore($winner)
export const useIsShown = () => useStore($isShown)
