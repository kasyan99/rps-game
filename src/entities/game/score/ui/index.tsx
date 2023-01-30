type Props = {
   username: string
   opponentName: string
   userScore: number
   opponetScore: number
}

export const Score: React.FC<Props> = ({ opponentName, opponetScore, userScore, username }) => {
   return <div><strong>Score: </strong>{username} ({userScore}) : {opponentName} ({opponetScore})</div>
}

