type Props = {
   opponentName: string
}

export const OpponentName: React.FC<Props> = ({ opponentName }) => {
   return (
      <div>Opponent: {opponentName}</div>
   )
}
