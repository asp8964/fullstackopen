const assert = require('node:assert')
const { test, after, beforeEach, describe, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

let token

const newBlog = {
  title: 'async/await simplifies making async calls',
  author: 'fullstackopen',
  url: 'https://fullstackopen.com/en/',
}

before(async () => {
  token = await helper.getToken()
  // console.log('initial token ', token)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const userId = await helper.getUserId()
  // console.log(userId)
  const initialBlogs = helper.initialBlogs.map((blog) => {
    blog.user = userId
    return blog
  })
  await Blog.insertMany(initialBlogs)
})

after(async () => {
  await mongoose.connection.close()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  // console.log(response.body)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id is the unique identifier property', async () => {
  const blogs = await helper.blogsInDb()
  const firstBlog = blogs[0]
  const blogsById = await Blog.find({ _id: firstBlog.id })
  // console.log(firstBlog, blogsById)

  assert.deepStrictEqual(firstBlog.id, blogsById[0]._id.toString())
})

test('a valid blog can be added', async () => {
  // const token = await helper.getToken()
  // console.log('add', token)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  //   console.log(blogsAtEnd)

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((n) => n.title)
  assert(titles.includes('async/await simplifies making async calls'))
})

test('non exist likes return zero', async () => {
  const token = await helper.getToken()
  // console.log('token', token)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  //   console.log(blogsAtEnd)

  assert.strictEqual(
    blogsAtEnd.find((blog) => blog.title === newBlog.title).likes,
    0
  )
})

test('title or url is required', async () => {
  const token = await helper.getToken()
  const newBlogWithNoTitle = {
    author: 'fullstackopen',
    url: 'https://fullstackopen.com/en/',
    likes: 11,
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogWithNoTitle)
    .expect(400)

  const newBlogWithNoUrl = {
    title: 'async/await simplifies making async calls',
    author: 'fullstackopen',
    likes: 12,
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogWithNoUrl)
    .expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const token = await helper.getToken()
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((n) => n.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('update of a blog', () => {
  test('update a specific blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlog = blogsAtStart[0]
    // console.log('first blog', firstBlog)

    const blogToUpdate = { likes: firstBlog.likes + 1 }
    const updatedBlog = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(blogToUpdate)
      .expect(200)
    // console.log(updatedBlog._body)

    assert.strictEqual(updatedBlog._body.likes, firstBlog.likes + 1)
  })
})

test('add a blog without token', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})
