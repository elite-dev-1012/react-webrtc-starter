import * as types from '@client/types/media'

export type Actions =
  | ReturnType<typeof getUserMediaSuccess>
  | ReturnType<typeof getUserMediaFailure>

export const getUserMedia = (constraints: MediaStreamConstraints) =>
  ({
    type: types.GET_USER_MEDIA,
    payload: {
      constraints,
    },
  } as const)

export const getUserMediaSuccess = (stream: MediaStream) =>
  ({
    type: types.GET_USER_MEDIA_SUCCESS,
    payload: {
      stream,
    },
  } as const)

export const getUserMediaFailure = (error: Error) =>
  ({
    type: types.GET_USER_MEDIA_FAILURE,
    payload: {
      error,
    },
  } as const)
