import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Result } from "shared/api"
import { Winner } from "../types"

type InitialState = {
  results: Result[] | null
  winner: Winner
  isShown: boolean
}

const initialState: InitialState = {
  results: null,
  winner: null,
  isShown: false,
}

export const resultsModel = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (
      state,
      { payload: results }: PayloadAction<Result[] | null>
    ) => {
      state.results = results
    },
    setWinner: (state, { payload: winner }: PayloadAction<Winner>) => {
      state.winner = winner
    },
    setIsShown: (state, { payload: isShown }: PayloadAction<boolean>) => {
      state.isShown = isShown
    },
  },
})

export const { setResults, setWinner, setIsShown } = resultsModel.actions

// selectors
export const useResults = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.results,
      (results) => results.results
    )
  )

export const useWinner = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.results,
      (results) => results.winner
    )
  )

export const useIsShown = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.results,
      (results) => results.isShown
    )
  )

export const reducer = resultsModel.reducer
