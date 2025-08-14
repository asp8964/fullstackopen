import { useQuery } from '@apollo/client'
// import { useBooksValue } from '../BooksContext'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  //   const books = useBooksValue()
  const currentUser = useQuery(ME, {
    skip: !props.show,
  })

  const genre = currentUser?.data?.me?.favoriteGenre

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    skip: !props.show,
    fetchPolicy: 'cache-and-network',
  })

  //   console.log(
  //     result.loading,
  //     currentUser.loading,
  //     window.localStorage.getItem('library-user-token')
  //   )

  if (!props.show) {
    return null
  }

  if (
    result.loading ||
    currentUser.loading ||
    !window.localStorage.getItem('library-user-token')
  ) {
    return <div>loading...</div>
  }

  const books = result?.data?.allBooks
  console.log(' books', books)

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre{' '}
        <strong>{currentUser?.data?.me?.favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
