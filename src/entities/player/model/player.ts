import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Socket } from "socket.io-client"
import { STORE_NAME, USER_NAME } from "../config"
import { Username } from "../types"

type InitialState = {
  username: Username
  channel: Socket | null
}

const initialState: InitialState = {
  username: null,
  channel: null,
}

export const setUsername = createAsyncThunk(
  STORE_NAME,
  async (username: Username = null) => {
    //user entered name
    if (username) {
      //store username
      localStorage.setItem(USER_NAME, username)
      return username
    }
    //check if username is in localstorage
    else {
      //get stored name
      const storagedName: Username = localStorage.getItem(USER_NAME)
      return storagedName
    }
  }
)

export const playerModel = createSlice({
  name: "player",
  initialState,
  reducers: {
    //set opened socket
    setChannel: (state, { payload: channel }: PayloadAction<Socket | null>) => {
      state.channel = channel
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types
    builder.addCase(
      setUsername.fulfilled,
      (state, { payload: username }: PayloadAction<Username>) => {
        state.username = username
      }
    )
  },
})

export const { setChannel } = playerModel.actions

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
