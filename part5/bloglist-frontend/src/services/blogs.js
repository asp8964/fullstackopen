import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blog) => {
  const res = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  })
  const result = await axios.get(`${baseUrl}/${res.data.id}`)
  // console.log(result)

  return result.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: token },
  })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  })
  return response.data
}

export default { setToken, getAll, create, update, remove }
