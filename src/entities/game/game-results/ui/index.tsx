import { Result } from "shared/api"
import { Winner } from "../types"

type Props = {
   player1: Result
   player2: Result
   winner: Winner
}

export const GameResults: React.FC<Props> = ({ player1, player2, winner }) => {
   if (!winner) return null

   return (
      <div>Results:
         <div>{player1.username}: {player1.choice}</div>
         <div>{player2.username}: {player2.choice}</div>
         <div>
            <strong>
               {
                  winner === 'draw'
                     ? 'Draw'
                     : `Winner: ${winner.username}`
               }
            </strong>
         </div>
      </div>
   )
}
