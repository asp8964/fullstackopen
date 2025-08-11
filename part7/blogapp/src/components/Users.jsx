import { Flex, Heading, Link, Table } from '@radix-ui/themes'
import { useSelector } from 'react-redux'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  const userStats = blogs.reduce((acc, blog) => {
    const id = blog?.user?.id
    const name = blog?.user?.name
    if (!name) return acc
    if (!acc[id]) {
      acc[id] = { name, counter: 0 }
    }
    acc[id].counter++
    return acc
  }, {})
  //   console.log('userStats', userStats)

  return (
    <Flex direction='column' maxWidth='350px' gap='3'>
      <Heading size='7'>Users</Heading>
      <Table.Root size='2' variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>users</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>blogs created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.entries(userStats).map(([id, value]) => (
            <Table.Row key={id}>
              <Table.RowHeaderCell>
                <Link href={`/users/${id}`}>{value.name}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>{value.counter}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}

export default Users
