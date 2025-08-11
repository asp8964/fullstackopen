import { createSlice } from '@reduxjs/toolkit'

const authorSlice = createSlice({
  name: 'authors',
  initialState: null,
  reducers: {
    setAuthors(_, action) {
      return action.payload
    },
  },
})

export const { setAuthors } = authorSlice.actions

export const initializeAuthors = (blogs) => {
  return (dispatch) => {
    const authors = blogs?.reduce((acc, blog) => {
      const id = blog?.user?.id
      const name = blog?.user?.name
      if (!name) return acc
      if (!acc[id]) {
        acc[id] = { name, counter: 0 }
      }
      acc[id].counter++
      return acc
    }, {})
    // console.log('init', authors)

    dispatch(setAuthors(authors))
  }
}

export default authorSlice.reducer
