import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Socket } from "socket.io-client"

type InitialState = {
  username: string | null
  channel: Socket | null
}

const initialState: InitialState = {
  username: null,
  channel: null,
}

export const playerModel = createSlice({
  name: "player",
  initialState,
  reducers: {
    setUsername: (
      state,
      { payload: username }: PayloadAction<string | null>
    ) => {
      state.username = username
    },
    //set opened socket
    setChannel: (state, { payload: channel }: PayloadAction<Socket | null>) => {
      state.channel = channel
    },
  },
})

export const { setUsername, setChannel } = playerModel.actions

// selectors
export const useUsername = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.player,
      (player) => player.username
    )
  )

export const useChannel = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.player,
      (player) => player.channel
    )
  )

export const reducer = playerModel.reducer
