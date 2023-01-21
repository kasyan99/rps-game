export type GameElement = "rock" | "paper" | "scissors"

export interface IUser {
  username: string
}

export type Result = {
  username: string
  choice: GameElement
}
