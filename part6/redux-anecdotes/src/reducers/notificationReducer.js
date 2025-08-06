import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  // initialState: 'render here notification..',
  initialState: '',
  reducers: {
    addNotification(_, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const setNotification = (content, time = 5) => {
  return async (dispatch) => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
