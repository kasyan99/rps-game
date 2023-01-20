import Status from "./status"

type Props = {
   name: string | undefined
   isOnline: boolean
   isMadeChoice: boolean
}
const Opponent: React.FC<Props> = ({ name, isOnline, isMadeChoice }) => {
   return (
      <div>Opponent: {name}
         {
            name ?
               <Status isMadeChoice={isMadeChoice} isOnline={isOnline} />
               : ' -'
         }
      </div>
   )
}

export default Opponent
