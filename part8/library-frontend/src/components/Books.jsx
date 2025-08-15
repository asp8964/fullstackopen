import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [filterText, setFilterText] = useState('')
  const [genres, setGenres] = useState(null)
  // const [books, dispatch] = useContext(BooksContext)

  const { data } = useQuery(ALL_BOOKS, {
    variables: { genre: filterText },
    // skip: !props.show,
    fetchPolicy: 'cache-and-network',
  })

  const books = data?.allBooks

  // const books = result?.data?.allBooks
  // const genres = new Set(books?.map((book) => book.genres).flat())

  useEffect(() => {
    if (!filterText) {
      setGenres(Array.from(new Set(books?.map((book) => book.genres).flat())))
    }
  }, [books, filterText])

  // useEffect(() => {
  //   if (result.data?.allBooks) {
  //     dispatch({ type: 'SET', payload: result.data?.allBooks })
  //     console.log('dispatch', result.data?.allBooks)
  //   }
  // }, [dispatch, result.data?.allBooks])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            // ?.filter((book) => !filterText || book.genres.includes(filterText))
            ?.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {Array.from(genres)?.map((genre) => (
        <button
          key={genre}
          onClick={(e) => setFilterText(e.target.value)}
          value={genre}>
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          // refetch()
          setFilterText('')
        }}
        value='all genres'>
        all genres
      </button>
    </div>
  )
}

export default Books
