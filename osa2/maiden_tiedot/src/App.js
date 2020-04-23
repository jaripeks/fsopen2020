import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = event => setFilter(event.target.value)
  const countriesToShow = filter === ''
    ? countries
    : countries.filter(country => country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <Filter 
        text='find countries'
        value={filter}
        onChange={handleFilterChange}
      />
      <Countries
        countries={countriesToShow}
        select={handleFilterChange}
      />
    </div>
  );
};

export default App;