import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment'

const commentSlice = createSlice({
  name: 'comments',
  initialState: null,
  reducers: {
    setComments(_, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setComments, appendComment } = commentSlice.actions

export const getCommentsById = (blogId) => {
  return async (dispatch) => {
    const comments = await commentService.getById(blogId)
    dispatch(setComments(comments))
  }
}

export const createComment = (comment) => {
  return async (dispatch) => {
    const newComment = await commentService.create(comment)
    dispatch(appendComment(newComment))
  }
}

export default commentSlice.reducer
