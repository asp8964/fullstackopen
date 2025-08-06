import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotification()

  const updateAsNutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAs) => {
      const as = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        as.map((anecdote) =>
          anecdote.id === updatedAs.id ? updatedAs : anecdote
        )
      )
    },
  })
  const handleVote = (anecdote) => {
    console.log('vote')
    updateAsNutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    // dispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' voted` })
    // setTimeout(() => {
    //   dispatch({ type: 'CLEAR' })
    // }, 5000)
    dispatch(`anecdote '${anecdote.content}' voted`)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError && result.error.code === 'ERR_NETWORK') {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
