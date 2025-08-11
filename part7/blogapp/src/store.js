import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import visibleReducer from './reducers/visibleReducer'
import notificationReducer from './reducers/notificationReducer'
import authorReducer from './reducers/authorReducer'
import commentReducer from './reducers/commentReducer'

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    visible: visibleReducer,
    notification: notificationReducer,
    authors: authorReducer,
    comments: commentReducer,
  },
})
