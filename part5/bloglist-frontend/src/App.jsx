import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  const sortAndSetBlogs = (blogs) => {
    setBlogs(
      blogs.sort((o, a) =>
        o.likes === a.likes ? 0 : o.likes > a.likes ? -1 : 1
      )
    )
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => sortAndSetBlogs(blogs))
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

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.create(blogObject)

      setBlogs(blogs.concat(result))
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

  const updateBlog = async (blogObject) => {
    const result = await blogService.update(blogObject)

    sortAndSetBlogs(
      blogs.map((blog) =>
        blog.id.toString() === result.id.toString()
          ? { ...blog, likes: result.likes }
          : blog
      )
    )
    // console.log(result)
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    // console.log('finish', result)
    setBlogs(blogs.filter((blog) => blog.id !== id))
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
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            {/* <Togglable ref={blogFormRef}> */}
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default App
