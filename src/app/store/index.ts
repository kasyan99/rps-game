import { configureStore } from "@reduxjs/toolkit"

import { playerModel } from "entities/player"

export const store = configureStore({
  reducer: {
    player: playerModel.reducer,
  },
  //to store socket
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
