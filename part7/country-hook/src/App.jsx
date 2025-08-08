import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // axios.get(`${baseUrl}/all`).then((res) => setCountry(res.data))
    name &&
      axios
        .get(`${baseUrl}/name/${name}`)
        .then((res) => {
          const data = res.data
          // console.log(data)

          const newCountry = {
            found: true,
            data: {
              name: data.name.common,
              capital: data.capital[0],
              population: data.population,
              flag: data.flags.png,
            },
          }
          setCountry(newCountry)
        })
        .catch(() => {
          setCountry({ found: false })
        })
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log('country', country)

  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  // console.log('name', name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
