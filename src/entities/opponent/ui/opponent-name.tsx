type Props = {
   opponentName: string | undefined
}

export const OpponentName: React.FC<Props> = ({ opponentName }) => {
   return (
      <span>Opponent: {opponentName}</span>
   )
}
