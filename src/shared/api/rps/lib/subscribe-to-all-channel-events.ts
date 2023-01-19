import { rpsApi } from "shared/api"
import { Socket } from "socket.io-client"

export function subscribeToAllChannelEvents(socket: Socket) {
  rpsApi.player.subscribePlayersConnected(socket)
  rpsApi.player.subscribePlayersDisconnected(socket)
  rpsApi.player.subscribePlayersReceived(socket)

  rpsApi.game.subscribeOponentChoice(socket)
  rpsApi.game.subscribeGameFinished(socket)
}
