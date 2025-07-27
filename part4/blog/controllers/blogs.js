const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  // console.log('title', title)

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  blog.title = title ?? blog.title
  blog.author = author ?? blog.author
  blog.url = url ?? blog.url
  blog.likes = likes ?? blog.likes

  const updatedBlog = await blog.save()
  return response.json(updatedBlog)
})

module.exports = blogsRouter
