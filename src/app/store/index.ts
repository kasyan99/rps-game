import { configureStore } from "@reduxjs/toolkit"

import { resultsModel } from "entities/game-results"
import { opponentModel } from "entities/opponent"
import { playerModel } from "entities/player"
import { scoreModel } from "entities/score"

export const store = configureStore({
  reducer: {
    player: playerModel.reducer,
    opponent: opponentModel.reducer,
    score: scoreModel.reducer,
    results: resultsModel.reducer,
  },
  //to store socket
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
