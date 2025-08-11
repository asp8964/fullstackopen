import { useSelector } from 'react-redux'
import { DataList, Flex, Link } from '@radix-ui/themes'

const Blogs = () => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }
  const blogs = useSelector((state) => state.blogs)
  //   console.log(blogs)

  return (
    <Flex direction='column' gap='6'>
      <DataList.Root size='2'>
        {blogs.map((blog) => (
          <DataList.Item key={blog.id} align='baseline'>
            <DataList.Value>
              <Link underline='always' href={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Flex>
  )
}

export default Blogs
