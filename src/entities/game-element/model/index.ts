import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { GameElement } from "shared/api"
import { initialGameElements } from "../config"
import { IGameElement } from "../types"

type InitialState = {
  gameElements: IGameElement[]
}

const initialState: InitialState = {
  gameElements: initialGameElements,
}

export const gameElementModel = createSlice({
  name: "game-element",
  initialState,
  reducers: {
    setChosenElenment: (
      state,
      { payload: value }: PayloadAction<GameElement>
    ) => {
      state.gameElements = state.gameElements.map((elem) => {
        //to choose element
        if (elem.value === value) {
          const newElem = { ...elem }
          newElem.checked = true
          return newElem
        }
        return elem
      })
    },
    resetElementsValue: (state) => {
      state.gameElements = state.gameElements.map((elem) => {
        const newElem = { ...elem }
        newElem.checked = false
        return newElem
      })
    },
  },
})

export const { resetElementsValue, setChosenElenment } =
  gameElementModel.actions

// selectors
export const useGameElements = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.gameElement,
      (gameElement) => gameElement.gameElements
    )
  )

export const reducer = gameElementModel.reducer
