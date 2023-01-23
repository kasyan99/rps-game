type Props = {
   opponentName: string
}

export const OpponentName: React.FC<Props> = ({ opponentName }) => {
   return (
      <span>Opponent: {opponentName}</span>
   )
}
