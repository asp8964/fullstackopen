import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import Comment from './Comment'
import { useNavigate } from 'react-router'
import { Button, Dialog, Flex, Heading, Link, Text } from '@radix-ui/themes'

const BlogDetail = (props) => {
  const blog = props.blog
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  //   console.log('blog-detail', blog)
  if (!blog) {
    return null
  }

  const handleBlogLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(updateBlog(updatedBlog))
  }

  const handleBlogDelete = () => {
    // if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    //   dispatch(deleteBlog(blog.id))
    //   useNavigate
    //   navigate('/')
    // }
    dispatch(deleteBlog(blog.id))
    useNavigate
    navigate('/')
  }

  return (
    <Flex direction='column' gap='2'>
      <Heading size='7'>
        {blog.title} {blog.author}
      </Heading>
      <Link href={blog.url}>{blog.url}</Link>
      <Flex asChild justify='start' align='center'>
        <label>
          <Text>{blog.likes} likes</Text>
          <Button size='2' variant='outline' onClick={handleBlogLike}>
            like
          </Button>
        </label>
      </Flex>
      <Text>added by {blog.user.name}</Text>
      {blog.user.username === currentUser.username && (
        <Flex>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button variant='outline' color='red'>
                remove
              </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth='450px'>
              <Dialog.Title>{`Remove blog ${blog.title} by ${blog.author}`}</Dialog.Title>

              <Flex gap='3' mt='4' justify='end'>
                <Dialog.Close>
                  <Button variant='soft' color='gray'>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={handleBlogDelete}>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      )}
      <Comment blogId={blog.id} />
    </Flex>
  )
}

BlogDetail.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node,
}

export default BlogDetail
