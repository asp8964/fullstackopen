import { createSlice } from '@reduxjs/toolkit'
import asService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAs(state, action) {
      state.push(action.payload)
    },
    setAs(_, action) {
      return action.payload
    },
  },
})

export const initializeAs = () => {
  return async (dispatch) => {
    const as = await asService.getAll()
    dispatch(setAs(as))
  }
}

export const createAs = (content) => {
  return async (dispatch) => {
    const newAs = await asService.createNew(content)
    dispatch(appendAs(newAs))
  }
}

export const voteAs = (as) => {
  return async (dispatch, getState) => {
    const updatedAs = await asService.updateVote(as)
    // console.log(getState())

    dispatch(
      setAs(
        getState().anecdotes.map((anecdote) =>
          as.id !== anecdote.id ? anecdote : updatedAs
        )
      )
    )
  }
}

export const { appendAs, setAs } = anecdoteSlice.actions
export default anecdoteSlice.reducer
