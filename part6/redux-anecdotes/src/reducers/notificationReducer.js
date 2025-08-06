import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'render here notification..',
  reducers: {
    display(_, action) {
      return action.payload
    },
    remove() {
      return ''
    },
  },
})

export const { display, remove } = notificationSlice.actions
export default notificationSlice.reducer
