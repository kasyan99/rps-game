import { usePlayer } from "../model"

export const Player: React.FC = () => {
   //get from store
   const username = usePlayer()

   return (
      <div>Player: {username}</div>
   )
}

