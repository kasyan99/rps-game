// import { useWinner } from "entities/game-results/model/results"
// import { Winner } from "entities/game-results/types"
// import { useOpponentName } from "entities/opponent"
// import { useUsername } from "entities/player/model"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
// import { increaseOpponentScore, increaseUserScore, useOpponentScore, useUserScore } from "../model"


type Props = {
   username: string
   opponentName: string
   userScore: number
   opponetScore: number
}

export const Score: React.FC<Props> = ({ opponentName, opponetScore, userScore, username }) => {

   // const username = useUsername()
   // const opponentName = useOpponentName()

   // const userScore = useUserScore()
   // const opponetScore = useOpponentScore()

   // const winner = useWinner()

   // const dispatch = useDispatch()

   // const changeScore = (winner: Winner) => {
   //    if (!winner || winner === 'draw') {
   //       return null
   //    } else if (winner.username === username) {
   //       dispatch(increaseUserScore())
   //    } else if (winner.username === opponentName) {
   //       dispatch(increaseOpponentScore())
   //    }
   // }

   // useEffect(() => {
   //    changeScore(winner)
   // }, [winner])


   return (
      <div><strong>Score: </strong>{username} ({userScore}) : {opponentName} ({opponetScore})</div>
   )
}

