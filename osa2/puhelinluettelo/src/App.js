import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Form from './components/Form';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';
import './App.css';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewname] = useState('')
    const [newNumber, setNewnumber] = useState('')
    const [filter, setFilter] = useState('')
    const [noteMessage, setNoteMessage] = useState({ className: null, message: null })

    useEffect(() => {
        personService
            .getAll()
            .then(allPersons => setPersons(allPersons))
            .catch(error => console.log(error))
    }, [])

    const handleNameChange = event => setNewname(event.target.value)
    const handleNumberChange = event => setNewnumber(event.target.value)
    const handleFilterChange = event => setFilter(event.target.value)

    const addPerson = event => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            const foundPerson = persons.find(p => p.name === newName)
            if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                const changedPerson = { ...foundPerson, number: newNumber }
                personService
                    .update(foundPerson.id, changedPerson)
                    .then(returnedPerson => {
                        console.log(returnedPerson)
                        setPersons(persons.map(p => p.id !== foundPerson.id ? p : returnedPerson))
                        setNewname('')
                        setNewnumber('')
                        setNoteMessage({ className: 'note', message: `${returnedPerson.name}s number was changed` })
                        setTimeout(() => {
                            setNoteMessage({ className: null, message: null })
                        }, 5000)
                    })
                    .catch(error => {
                        setNoteMessage({ className: 'error', message: error.response.data.error })
                        setTimeout(() => {
                            setNoteMessage({ className: null, message: null })
                        }, 5000)
                    })
            }
        } else {
            personService
                .create({ name: newName, number: newNumber })
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewname('')
                    setNewnumber('')
                    setNoteMessage({ className: 'note', message: `${returnedPerson.name} was added!` })
                    setTimeout(() => {
                        setNoteMessage({ className: null, message: null })
                    }, 5000)
                })
                .catch(error => {
                    setNoteMessage({ className: 'error', message: error.response.data.error })
                    setTimeout(() => {
                        setNoteMessage({ className: null, message: null })
                    }, 5000)
                })
        }
    }

    const deletePerson = id => {
        const toDelete = persons.find(person => person.id === id)
        window.confirm(`Delete ${toDelete.name}?`)
            ? personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    setNoteMessage({ className: 'error', message: `${toDelete.name} was deleted!` })
                    setTimeout(() => {
                        setNoteMessage({ className: null, message: null })
                    }, 5000)
                })
                .catch(error => {
                    console.log(error)
                    setPersons(persons.filter(p => p.id !== id))
                    setNoteMessage({ className: 'error', message: `${toDelete.name} was already removed from the database!` })
                    setTimeout(() => {
                        setNoteMessage({ className: null, message: null })
                    }, 5000)
                })
            : console.log('cancelled')
    }

    const personsToShow = filter === ''
        ? persons
        : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={noteMessage} />
            <Filter value={filter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <Form
                name={newName}
                onNameChange={handleNameChange}
                number={newNumber}
                onNumberChange={handleNumberChange}
                submit={addPerson}
            />
            <h2>Numbers</h2>
            <Persons
                persons={personsToShow}
                handleDelete={deletePerson}
            />
        </div>
    );
};

export default App;
