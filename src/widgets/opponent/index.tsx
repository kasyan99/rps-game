import { useOpponent } from "entities/opponent"
import { SetOpponentName } from "features/set-opponent-name/ui"
import { SetOpponentStatus } from "features/set-opponent-status/ui"


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