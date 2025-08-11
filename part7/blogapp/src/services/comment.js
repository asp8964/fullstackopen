import axios from 'axios'
const baseUrl = '/api/blogs'

const getById = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

const create = async (comment) => {
  const res = await axios.post(`${baseUrl}/${comment.blog}/comments`, comment)
  return res.data
}

export default { getById, create }
