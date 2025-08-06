import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    // id: getId(),
    votes: 0,
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (as) => {
  const response = await axios.put(`${baseUrl}/${as.id}`, {
    ...as,
    votes: as.votes + 1,
  })
  return response.data
}

export default { getAll, createNew, updateVote }
