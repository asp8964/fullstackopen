import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Flex, Heading } from '@radix-ui/themes'

const UserDetail = ({ author }) => {
  const blogs = useSelector((state) => state.blogs)
  if (!author) {
    return null
  }
  console.log('author', author)

  const id = author[0]
  const username = author[1].name

  const blogTitles = blogs.reduce((acc, blog) => {
    if (blog?.user?.id !== id) {
      return acc
    }
    acc[blog.id] = blog.title
    return acc
  }, {})

  return (
    <Flex direction='column' gap='3'>
      <Heading size='7'>{username}</Heading>
      <Heading size='5'>added blogs</Heading>
      <ul>
        {Object.entries(blogTitles).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
    </Flex>
  )
}
UserDetail.propTypes = {
  author: PropTypes.object.isRequired,
}

export default UserDetail
