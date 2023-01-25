import { USER_NAME } from "../config"
import { Username } from "../types"

export const storeName = (username: string) => {
  localStorage.setItem(USER_NAME, username)
}

export const getName = (): Username => {
  const storagedName: Username = localStorage.getItem(USER_NAME)

  return storagedName
}
