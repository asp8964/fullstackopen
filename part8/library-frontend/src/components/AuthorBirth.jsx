import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR_BIRTH } from '../queries'

const AuthorBirth = ({ authors }) => {
  //   console.log(authors)
  const [name, setName] = useState('')
  const [born, setBorn] = useState(null)
  const [editAuthorBirth] = useMutation(EDIT_AUTHOR_BIRTH)
  //   console.log('name', name, born)

  const handleAuthorBirthUpdate = (e) => {
    e.preventDefault()
    editAuthorBirth({ variables: { name, born: Number(born) } })
    setName('')
    setBorn(null)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleAuthorBirthUpdate}>
        <div>
          <select onChange={(e) => setName(e.target.value)}>
            {authors?.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            born <input onChange={(e) => setBorn(e.target.value)} />
          </label>
        </div>
        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  )
}

export default AuthorBirth
