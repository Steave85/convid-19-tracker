import React, { useState, useEffect } from 'react';
import { actionTypes, initialState } from '../context/Reducer';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useStateValue } from '../context/InfoProvider';
import '../styles/Header.css'

function Header() {

    const [state, dispatch] = useStateValue();
    const [country, setCountry] = useState('worldwide');
    const URL = "https://disease.sh/v3/covid-19/countries";
    const URL_ALL = "https://disease.sh/v3/covid-19/all";

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
        const FORMATTED_URL = (countryCode === 'worldwide') ? URL_ALL : `${URL}/${countryCode}`;
        await fetch(FORMATTED_URL)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    countryInfo: data,
                    type: actionTypes.SET_COUNTRY_INFO
                });
                dispatch({
                    center: (countryCode === 'worldwide')?
                    initialState.center : ({
                        lat: data.countryInfo.lat, 
                        lng: data.countryInfo.long
                    }),
                    type: actionTypes.SET_MAP_CENTER
                });
                dispatch({
                    zoom: (countryCode === 'worldwide') ? 2:4,
                    type: actionTypes.SET_MAP_ZOOM
                });
                dispatch({
                    countryCode: (countryCode === 'worldwide') ? '':countryCode,
                    type: actionTypes.SET_COUNTRY_CODE
                });
            })
    }

    useEffect(() => {
        (Object.keys(state.countryInfo).length === 0) && fetch(URL_ALL)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    ...state,
                    countryInfo: data,
                    type: actionTypes.SET_COUNTRY_INFO
                });
            })        
    }, [state, dispatch])

    useEffect(()=>{
        (state.countries.length===0) && (fetch(URL)
        .then(response => response.json())
        .then(data => {
            const countries = data.map(country => ({
                name: country.country,
                value: country.countryInfo.iso2
            }))
            dispatch({
                ...state,
                data: data,
                type: actionTypes.SET_DATA
            });
            dispatch({
                ...state,
                countries: countries,
                type: actionTypes.SET_COUNTRIES
            });
            dispatch({
                ...state,
                tableCountries: data,
                type: actionTypes.SET_TABLE_COUNTRIES
            });
        }))
    },[state, dispatch])

return (
    <>
        <div className="header">
            <h1>Covid-19 Tracker</h1>
            <FormControl className="header__dropdown">
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                    <MenuItem key='worldwide' value='worldwide'>Worldwide</MenuItem>
                    {
                        (state.countries.map((country, index) => <MenuItem key={country + index} value={country.value}>{country.name}</MenuItem>))
                    }
                </Select>
            </FormControl>
        </div>
    </>
)
}

export default Header
