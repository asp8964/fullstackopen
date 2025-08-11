const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
// const jwt = require('jsonwebtoken')
// const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // console.log(request)

  const decodedToken = request.user
  // console.log(decodedToken)

  if (!decodedToken?.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'UserId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  // console.log(blog)

  if (blog?.user.toString() === request.user?.id.toString()) {
    await Blog.deleteOne({ _id: id })
    // console.log(result)

    return response.status(204).end()
  }
  return response.status(401).json({ error: 'only creator can delete it' })
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body
  // console.log('title', title)

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  blog.title = title ?? blog.title
  blog.author = author ?? blog.author
  blog.url = url ?? blog.url
  blog.likes = likes ?? blog.likes
  blog.user = user ?? blog.user

  const updatedBlog = await blog.save()
  // .populate('user', {
  //   username: 1,
  //   name: 1,
  //   id: 1,
  // })
  return response.json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id })
  response.json(comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const content = request.body?.content
  const comment = new Comment({ content, blog: request.params.id })
  const result = await comment.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
