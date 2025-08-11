import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(_, action) {
      return action.payload
    },
    clearMessage() {
      return ''
    },
  },
})

export const { setMessage, clearMessage } = notificationReducer.actions

export const resetMessage = (messageObj, timeout = 5000) => {
  console.log(timeout)

  return (dispatch) => {
    dispatch(setMessage(messageObj))
    setTimeout(() => {
      dispatch(clearMessage())
    }, timeout)
  }
}

export default notificationReducer.reducer
