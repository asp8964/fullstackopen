import { createSlice } from '@reduxjs/toolkit'

const visibleSlice = createSlice({
  name: 'visible',
  initialState: false,
  reducers: {
    setVisible(_, action) {
      return action.payload
    },
    changeVisible(state) {
      return !state
    },
  },
})

export const { setVisible, changeVisible } = visibleSlice.actions

export default visibleSlice.reducer
