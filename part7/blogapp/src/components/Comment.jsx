import { useDispatch, useSelector } from 'react-redux'
import { createComment, getCommentsById } from '../reducers/commentReducer'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useField } from '../hooks'
import { Button, Flex, Heading } from '@radix-ui/themes'

const Comment = ({ blogId }) => {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments)
  const { reset: cReset, ...commentField } = useField('text')

  useEffect(() => {
    dispatch(getCommentsById(blogId))
  }, [dispatch, blogId])
  //   console.log('comments', comments)

  const handleCommentCreate = () => {
    const newComment = { content: commentField.value, blog: blogId }
    dispatch(createComment(newComment))
    cReset()
  }

  return (
    <Flex direction='column' gap={2}>
      <Heading size='4'>Comments</Heading>
      <Flex align='center'>
        <input {...commentField} />
        <Button size='1' onClick={handleCommentCreate}>
          Add Comment
        </Button>
      </Flex>
      <ul className='list'>
        {comments?.map((comment) => (
          <li className='list-row' key={comment.id}>
            {comment.content}
          </li>
        ))}
      </ul>
    </Flex>
  )
}

Comment.propTypes = {
  blogId: PropTypes.string.isRequired,
}

export default Comment
