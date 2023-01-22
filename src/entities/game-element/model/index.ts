import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { GameElement } from "shared/api"
import { initialGameElements } from "../config"
import { IGameElement } from "../types"

type InitialState = {
  gameElements: IGameElement[]
  disabled: boolean
}

const initialState: InitialState = {
  gameElements: initialGameElements,
  disabled: true,
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
    setDisabled: (state, { payload: disabled }: PayloadAction<boolean>) => {
      state.disabled = disabled
    },
  },
})

export const { resetElementsValue, setChosenElenment, setDisabled } =
  gameElementModel.actions

// selectors
export const useGameElements = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.gameElement,
      (gameElement) => gameElement.gameElements
    )
  )

export const useDisabled = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.gameElement,
      (gameElement) => gameElement.disabled
    )
  )

export const reducer = gameElementModel.reducer
