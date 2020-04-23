import React, { useState, useEffect } from 'react';
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewname] = useState('')
  const [newNumber, setNewnumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = event => setNewname(event.target.value)
  const handleNumberChange = event => setNewnumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleAdd = event => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewname('')
      setNewnumber('')
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        submit={handleAdd}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
