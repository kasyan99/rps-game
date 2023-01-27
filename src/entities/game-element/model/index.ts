import { initialGameElements } from "../config"
import { createEvent, createStore } from "effector"
import { GameElement } from "shared/api"
import { IGameElement } from "../types"
import { useStore } from "effector-react"

export const setChosenElenment = createEvent<GameElement>()
export const resetElementsValue = createEvent()
export const setDisabled = createEvent<boolean>()

const $gameElements = createStore<IGameElement[]>(initialGameElements)
  .on(setChosenElenment, (gameElements, value) =>
    gameElements.map((elem) => {
      //to choose element
      if (elem.value === value) {
        const newElem = { ...elem }
        newElem.checked = true
        return newElem
      }
      return elem
    })
  )
  .on(resetElementsValue, (gameElements) =>
    gameElements.map((elem) => {
      const newElem = { ...elem }
      newElem.checked = false
      return newElem
    })
  )
  .on(setDisabled, (gameElements, disabled) =>
    gameElements.map((elem) => ({ ...elem, disabled }))
  )

//selector
export const useGameElements = () => useStore($gameElements)
