import React from 'react';
import Person from './Person'

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            {persons.map(person => <Person key={person.name} person={person} deletePerson={handleDelete} />)}
        </div>
    );
};

export default Persons;