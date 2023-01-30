import { IGameElement } from "../types"
import paper from "../ui/assets/paper-icon.jpg"
import rock from "../ui/assets/rock-icon.jpg"
import scissors from "../ui/assets/scissors-icon.jpg"

export const initialGameElements: IGameElement[] = [
  {
    value: "paper",
    checked: false,
    img: paper,
    disabled: false,
  },
  {
    value: "rock",
    checked: false,
    img: rock,
    disabled: false,
  },
  {
    value: "scissors",
    checked: false,
    img: scissors,
    disabled: false,
  },
]
