import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('input title')
  const authorInput = screen.getByPlaceholderText('input author')
  const urlInput = screen.getByPlaceholderText('input url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'full stack open')
  await user.type(authorInput, 'mluukkai')
  await user.type(urlInput, 'https://fullstackopen.com/en/')
  await user.click(sendButton)

  //   console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('full stack open')
  expect(createBlog.mock.calls[0][0].author).toBe('mluukkai')
  expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com/en/')
})
