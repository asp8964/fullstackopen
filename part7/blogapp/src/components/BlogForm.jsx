import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { changeVisible } from '../reducers/visibleReducer'
import { resetMessage } from '../reducers/notificationReducer'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'

const BlogForm = () => {
  const { reset: treset, ...title } = useField('text')
  const { reset: areset, ...author } = useField('text')
  const { reset: ureset, ...url } = useField('text')
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    dispatch(changeVisible())
  }

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    )
      .then(() => {
        dispatch(changeVisible())
        dispatch(
          resetMessage({
            value: `a new blog ${title.value} by ${author.value} added`,
            isError: false,
          })
        )
      })
      .catch(() =>
        dispatch(resetMessage({ value: 'Create blog fail', isError: true }))
      )
    treset()
    areset()
    ureset()
    // try {
    //   await dispatch(
    //     createBlog({
    //       title: title.value,
    //       author: author.value,
    //       url: url.value,
    //     })
    //   )

    //   dispatch(changeVisible())
    //   dispatch(
    //     resetMessage({
    //       value: `a new blog ${title.value} by ${author.value} added`,
    //       isError: false,
    //     })
    //   )
    // } catch {
    //   dispatch(resetMessage({ value: 'Create blog fail', isError: true }))
    // } finally {
    //   treset()
    //   areset()
    //   ureset()
    // }
  }

  return (
    <Flex direction='column'>
      <Box maxWidth='300px'>
        <Card size='2'>
          <Flex direction='column' gap='3'>
            <Flex asChild justify='center'>
              <Heading size='6'>Create New</Heading>
            </Flex>
            <Flex asChild justify='between'>
              <label>
                <Text size='2'>title:</Text>
                <input className='grow' {...title} />
              </label>
            </Flex>
            <Flex asChild justify='between'>
              <label>
                <Text size='2'>author:</Text>
                <input className='grow' {...author} />
              </label>
            </Flex>
            <Flex asChild justify='between'>
              <label>
                <Text size='2'>url:</Text>
                <input className='grow' {...url} />
              </label>
            </Flex>
            <Grid columns='2' gap='2'>
              <Button variant='surface' onClick={addBlog}>
                create
              </Button>
              <Button
                variant='surface'
                color='crimson'
                onClick={toggleVisibility}>
                cancel
              </Button>
            </Grid>
          </Flex>
        </Card>
      </Box>
    </Flex>
  )
}

// const Input = ({ text, onChange, value }) => (
//   <div>
//     {text}
//     <input onChange={onChange} value={value} />
//   </div>
// )

export default BlogForm
