import { createSelector, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

type InitialState = {
  opponentScore: number
  userScore: number
}

const initialState: InitialState = {
  opponentScore: 0,
  userScore: 0,
}

export const scoreModel = createSlice({
  name: "score",
  initialState,
  reducers: {
    increaseUserScore: (state) => {
      state.userScore += 1
    },
    increaseOpponentScore: (state) => {
      state.opponentScore += 1
    },
    resetScore: (state) => {
      state.userScore = 0
      state.opponentScore = 0
    },
  },
})

export const { increaseOpponentScore, increaseUserScore, resetScore } =
  scoreModel.actions

// selectors
export const useOpponentScore = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.score,
      (score) => score.opponentScore
    )
  )

export const useUserScore = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.score,
      (score) => score.userScore
    )
  )

export const reducer = scoreModel.reducer
