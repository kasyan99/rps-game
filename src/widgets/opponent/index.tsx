import { useOpponent } from "entities/player"
import { SetOpponentName, SetOpponentStatus } from "features/player"

export const Opponent: React.FC = () => {
   //get from store
   const { name: opponentName } = useOpponent()

   return (<div>
      <SetOpponentName />
      {
         opponentName ?
            <SetOpponentStatus />
            : ' -'
      }
   </div>
   )
}