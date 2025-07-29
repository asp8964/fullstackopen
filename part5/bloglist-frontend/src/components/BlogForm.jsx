const BlogForm = ({ createBlog, blog, setBlog }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <Input
          text="title:"
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          value={blog?.title}
        />
        <Input
          text="author:"
          onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          value={blog?.author}
        />
        <Input
          text="url:"
          onChange={(e) => setBlog({ ...blog, url: e.target.value })}
          value={blog?.url}
        />
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

const Input = ({ text, onChange, value }) => (
  <div>
    {text}
    <input onChange={onChange} value={value} />
  </div>
)

export default BlogForm
