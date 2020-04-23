import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Country = ({ country }) => {
    const [weather, setWeather] = useState({})
    const [showWeather, setShowWeather] = useState(false)
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
                setShowWeather(true)
            })
    }, [country])

    return (
        <div>
            <button onClick={() => console.log(weather.current.temperature)}>test</button>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(lang => 
                    <li key={lang.iso639_2}>{lang.name}</li>
                )}
            </ul>
            <img src={country.flag} width='200' alt='flag' />
            {/*Prolly should separate this into its own module/component but meh*/}
            <h2>Wheater in {country.capital}</h2>
            {showWeather ?
            <div>
                <div>
                    <b>temperature: </b>{`${weather.current.temperature} Celsius`}
                </div>
                <img src={weather.current.weather_icons[0]} alt='weather'/>
                <div>
                    <b>wind: </b>
                    {
                        `${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`
                    }
                </div>
            </div>
            : 'Loading...'}
        </div>
    );
};

export default Country;