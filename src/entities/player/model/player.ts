import { createEffect, createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { Socket } from "socket.io-client"
import { getName, storeName } from "../lib"
import { Username } from "../types"

export const setChannel = createEvent<Socket | null>()
export const setUsernameFx = createEffect<Username, Username>((username) => {
  //user entered name
  if (username) {
    //store username
    storeName(username)
    return username
  }
  //check if username is in storage
  else {
    //get stored name
    const storagedName: Username = getName()
    return storagedName
  }
})

const $player = createStore<Username>(null).on(
  setUsernameFx.doneData,
  (_, username) => username
)

const $channel = createStore<Socket | null>(null).on(
  setChannel,
  (_, channel) => channel
)

export const usePlayer = () => useStore($player)
export const useChannel = () => useStore($channel)
