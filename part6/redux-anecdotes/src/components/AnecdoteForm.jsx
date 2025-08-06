import { useDispatch } from 'react-redux'
import { createAs } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAs = (event) => {
    event.preventDefault()
    const content = event.target.as.value
    event.target.as.value = ''
    dispatch(createAs(content))
    dispatch(display(`you added '${content}'`))
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
