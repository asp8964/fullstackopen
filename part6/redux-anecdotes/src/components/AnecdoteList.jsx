import { useDispatch, useSelector } from 'react-redux'
import { voteAs } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter?.toLowerCase())
      )
      .sort((a, b) => (a.votes < b.votes ? 1 : -1))
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAs(id))
    anecdotes.find((as) => as.id === id)
    dispatch(
      display(`you voted '${anecdotes.find((as) => as.id === id).content}'`)
    )
  }
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
