import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('display blog title and author, but no URL or likes', () => {
  const blog = {
    title: 'Component testing',
    author: 'mluukkai',
    url: 'https://example.com/',
    likes: 6,
  }

  const { container } = render(<Blog blog={blog} />)
  // screen.debug()

  const titleElement = container.querySelector('.content')
  const urlElement = container.querySelector('.url')
  const likeElement = container.querySelector('.likes')
  expect(titleElement).toHaveTextContent('Component testing mluukkai')
  expect(urlElement).toBeNull()
  expect(likeElement).toBeNull()
})

test("clicking the button shows blog's URL and number of likes", async () => {
  const userInfo = {
    username: 'root',
    name: 'Super user',
  }
  const blog = {
    title: 'Component testing',
    author: 'mluukkai',
    url: 'https://example.com/',
    likes: 6,
    user: userInfo,
  }

  const { container } = render(<Blog blog={blog} user={userInfo} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  // screen.debug()
  const urlElement = container.querySelector('.url')
  const likeElement = container.querySelector('.likes')
  expect(urlElement).toHaveTextContent('https://example.com/')
  expect(likeElement).toHaveTextContent('likes 6 like')
})

test('clicking likes button twice', async () => {
  const userInfo = {
    username: 'root',
    name: 'Super user',
  }
  const blog = {
    title: 'Component testing',
    author: 'mluukkai',
    url: 'https://example.com/',
    likes: 6,
    user: userInfo,
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={userInfo} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likesButton = screen.getByText('like')
  await user.click(likesButton)
  await user.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
