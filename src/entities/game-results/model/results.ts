import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Result } from "shared/api"
import { Winner } from "../types"

type InitialState = {
  results: Result[] | null
  winner: Winner
}

const initialState: InitialState = {
  results: null,
  winner: null,
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
  },
})

export const { setResults, setWinner } = resultsModel.actions

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

export const reducer = resultsModel.reducer
