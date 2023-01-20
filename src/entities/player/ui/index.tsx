type Props = {
   name: string
}

export const Name: React.FC<Props> = ({ name }) => {
   return (
      <div>Player: {name}</div>
   )
}

