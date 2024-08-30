import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/Notification'
import Countries from './components/Countries'
import CountryDetail from './components/CountryDetail'

import './index.css'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)
  const [specifyMessage, setSpecifyMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (search) {
      const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
  
      setCountries(filteredCountries);
  
      if (filteredCountries.length > 10) {
        setSpecifyMessage('Too many matches, specify another filter.');
      } else {
        setSpecifyMessage(null);
      }
    } else {
      setCountries([]);
      setSpecifyMessage(null);
    }
  }, [search, allCountries]);

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setSelected(search)
  }

  const handleSelectCountry = (country) => {
    setSelected(country);
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        Find countries: <input value={search} onChange={handleChange} />
        <Notification message={specifyMessage} /> 
      </form>
      {!specifyMessage && (
        <Countries 
          countries={countries} 
          onSelectCountry={handleSelectCountry}
        />
      )}
      {selected && <CountryDetail country={selected} />}
    </div>
  )
}

export default App