import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

type InitialState = {
  name: string | undefined
}

const initialState: InitialState = {
  name: "",
}

export const opponentModel = createSlice({
  name: "opponent",
  initialState,
  reducers: {
    setOpponentName: (
      state,
      { payload: name }: PayloadAction<string | undefined>
    ) => {
      state.name = name
    },
  },
})

export const { setOpponentName } = opponentModel.actions

// selectors
export const useOpponentName = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.opponent,
      (opponent) => opponent.name
    )
  )

export const reducer = opponentModel.reducer
