import io from 'socket.io-client'
import { put, select } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { peerConnection } from '@client/utils/peerConnection'
import * as types from '@client/utils/connectionTypes'

export function* connectSocket(
  action: ReturnType<typeof connectionsAction.connectSocket>,
): Generator {
  try {
    const { roomId } = action.payload
    const state: any = yield select(connectionsSelector)
    const socket = io(process.env.DOMAIN as any)

    console.log('state.roomId', state.roomId)
    if (!state.roomId) {
      socket.on('connect', (e: any) => {
        socket.emit(types.JOIN, { roomId })
      })
    }

    socket.on(types.JOIN, ({ roomId }: any) => {
      console.log(roomId)
    })

    socket.on(types.CALL, (data: Record<string, any>) => {
      console.log(data)
    })

    socket.on(types.ROOM_NOT_FOUND, () => {
      console.log('部屋ないよーーーーー')
    })

    socket.on(types.OFFER, peerConnection.receivedOffer)
    socket.on(types.ANSWER, peerConnection.receivedAnswer)

    yield put(connectionsAction.connectSocketSuccess(socket, roomId))
  } catch (e) {
    yield put(connectionsAction.connectSocketFailure(e))
  }
}
