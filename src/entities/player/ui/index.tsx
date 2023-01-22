import { useUsername } from "../model"

export const Player: React.FC = () => {
   //get from store
   const name = useUsername()
   return (
      <div>Player: {name}</div>
   )
}

