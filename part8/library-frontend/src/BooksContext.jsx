import { createContext, useContext, useReducer } from 'react'

const booksReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload

    default:
      return state
  }
}

const BooksContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useBooksValue = () => {
  const booksAndDispatch = useContext(BooksContext)
  return booksAndDispatch[0]
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBooksDispatch = () => {
  const booksAndDispatch = useContext(BooksContext)
  return booksAndDispatch[1]
}

export const BooksContextProvider = (props) => {
  const [books, booksDispatch] = useReducer(booksReducer, null)

  return (
    <BooksContext.Provider value={[books, booksDispatch]}>
      {props.children}
    </BooksContext.Provider>
  )
}

export default BooksContext
