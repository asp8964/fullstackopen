import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  /* BlogForm.jsx:32 A component is changing an uncontrolled input to be controlled.
  This is likely caused by the value changing from undefined to a defined value, which should not happen.
  Decide between using a controlled or uncontrolled input element for the lifetime of the component.
  More info: https://react.dev/link/controlled-components */

  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    })
    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            value={blog?.title}
            placeholder="input title"
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
            value={blog?.author}
            placeholder="input author"
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
            value={blog?.url}
            placeholder="input url"
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

// const Input = ({ text, onChange, value }) => (
//   <div>
//     {text}
//     <input onChange={onChange} value={value} />
//   </div>
// )

export default BlogForm
