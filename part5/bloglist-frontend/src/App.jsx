import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  {
    /* BlogForm.jsx:32 A component is changing an uncontrolled input to be controlled. 
  This is likely caused by the value changing from undefined to a defined value, which should not happen.
  Decide between using a controlled or uncontrolled input element for the lifetime of the component.
  More info: https://react.dev/link/controlled-components */
  }
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      // console.log(user, user._id)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage({ value: 'Wrong username or password', isError: true })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const result = await blogService.create(blog)

      setBlogs(blogs.concat(result))
      setBlog({ title: '', author: '', url: '' })
      setMessage({
        value: `a new blog ${result.title} by ${result.author} added`,
        isError: false,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage({ value: 'Create blog fail', isError: true })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification message={message} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm createBlog={createBlog} blog={blog} setBlog={setBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
