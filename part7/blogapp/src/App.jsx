import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import { clearUser, initializeUser } from './reducers/userReducer'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { Routes, Route, Link, useMatch, useLocation } from 'react-router'
import BlogDetail from './components/BlogDetail'
import Users from './components/Users'
import UserDetail from './components/UserDetail'
import { initializeAuthors } from './reducers/authorReducer'
import _ from 'lodash'
import { Button, Flex, TabNav, Text } from '@radix-ui/themes'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const authors = useSelector((state) => state.authors)
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeAuthors(blogs))
  }, [dispatch, blogs])

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null
  // console.log('blog', blogs, matchBlog?.params.id, blog)

  const matchUser = useMatch('/users/:id')
  // console.log('before', matchUser && !_.isEmpty(authors))
  const author =
    matchUser && !_.isEmpty(authors)
      ? Object.entries(authors).find(([key]) => key === matchUser.params.id)
      : null
  // console.log('author', authors, matchUser?.params.id, author)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  return (
    <div>
      <TabNav.Root color='indigo'>
        <TabNav.Link asChild active={pathname === '/'}>
          <Link to='/'>Blogs</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/users'}>
          <Link to='/users'>Users</Link>
        </TabNav.Link>
        {currentUser ? (
          <TabNav.Link>
            <Text>
              {currentUser.name} logged in{' '}
              <Button variant='outline' size='1' onClick={handleLogout}>
                logout
              </Button>
            </Text>
          </TabNav.Link>
        ) : (
          <TabNav.Link asChild active={pathname === '/login'}>
            <Link to='/login'>Login</Link>
          </TabNav.Link>
        )}
      </TabNav.Root>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/users/:id' element={<UserDetail author={author} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/blogs/:id' element={<BlogDetail blog={blog} />} />
        <Route
          path='/'
          element={
            <>
              <h2>Blog App</h2>
              <Flex gap='2' direction='column'>
                <Togglable buttonLabel='Create new'>
                  {/* <Togglable ref={blogFormRef}> */}
                  <BlogForm />
                </Togglable>
                <Blogs />
              </Flex>
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
