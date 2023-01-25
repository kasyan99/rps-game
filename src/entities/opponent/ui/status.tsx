type Props = {
   isOnline: boolean
   isMadeChoice: boolean
}
export const Status: React.FC<Props> = ({ isOnline, isMadeChoice }) => {
   return (
      <span>{`(${isOnline ? 'online' : 'offline'})`} {isMadeChoice ? 'made a choice' : ''}</span>
   )
}