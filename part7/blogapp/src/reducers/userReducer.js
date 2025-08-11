import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const LoginUser = (loginInfo) => {
  return async (dispatch) => {
    const user = await loginService.login(loginInfo)
    // console.log(user, user._id)

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
