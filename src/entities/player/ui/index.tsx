import { useUsername } from "../model"

export const Player: React.FC = () => {
   const name = useUsername()
   return (
      <div>Player: {name}</div>
   )
}

