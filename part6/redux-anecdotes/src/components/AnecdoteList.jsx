import { useDispatch, useSelector } from 'react-redux'
import { voteAs } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter?.toLowerCase())
      )
      .sort((a, b) => (a.votes <= b.votes ? 1 : -1))
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(voteAs(anecdote))
    // anecdotes.find((as) => as.id === id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
