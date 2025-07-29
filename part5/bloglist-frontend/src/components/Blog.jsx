import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // console.log(blog)

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleBlogLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    // console.log('update', updatedBlog)
    updateBlog(updatedBlog)
  }

  const handleBlogDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
    // console.log('cancel')
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleBlogLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && (
            <button onClick={handleBlogDelete}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
