import { useDispatch } from 'react-redux'
import { createAs } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import asService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAs = async (event) => {
    event.preventDefault()
    const content = event.target.as.value
    event.target.as.value = ''
    // const newAs = await asService.createNew(content)
    dispatch(createAs(content))
    dispatch(setNotification(`new anecdote '${content}'`, 5))
    // setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAs}>
        <div>
          <input name="as" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
