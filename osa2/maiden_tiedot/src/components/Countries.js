import React from 'react';
import Country from './Country'

const Countries = ({ countries, select }) => {
    //not maybe the most readable, but wörks
    const countriesToShow = countries ?
        countries.length >= 10 ?
            'Too many matches, specify another filter'
            : countries.length > 1 ?
                countries.map(country =>
                    <div key={country.alpha3Code}>
                        {country.name}
                        <button value={country.name} onClick={select}>show</button>
                    </div>
                )
                : countries[0] ?
                    <Country country={countries[0]} />
                    : 'No countries match the filter'
        : 'no countries found'
    return (
        <div>
            {countriesToShow}
        </div>
    );
};

export default Countries;