import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR_BIRTH } from '../queries'
// import Select from 'react-select'

const AuthorBirth = ({ authors }) => {
  // console.log(authors)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthorBirth] = useMutation(EDIT_AUTHOR_BIRTH)
  //   console.log('name', name, born)

  // const options = authors.map((author) => ({
  //   value: author.name,
  //   label: author.name,
  // }))

  const handleAuthorBirthUpdate = (e) => {
    e.preventDefault()
    // console.log('author', name, born)
    editAuthorBirth({ variables: { name, born: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleAuthorBirthUpdate}>
        <div>
          {/* <Select
            options={options}
            defaultValue={name}
            onChange={(selected) => setName(selected.value)}
          /> */}
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value='' disabled></option>
            {authors?.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            born{' '}
            <input onChange={(e) => setBorn(e.target.value)} value={born} />
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
