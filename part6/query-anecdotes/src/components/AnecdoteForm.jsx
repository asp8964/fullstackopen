import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import {
  useNotification,
  // useNotificationDispatch,
} from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  // const dispatch = useNotificationDispatch()
  const dispatch = useNotification()

  const newAsMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAs) => {
      const as = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], as.concat(newAs))
    },
    onError: (e) => {
      console.log(e)
      dispatch(e.message)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // console.log('new anecdote')
    newAsMutation.mutate({ content, votes: 0 })
    // dispatch({ type: 'SET', payload: `new anecdote '${content}'` })
    // setTimeout(() => {
    //   dispatch({ type: 'CLEAR' })
    // }, 5000)
    dispatch(`new anecdote '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
