import React, {useCallback, useEffect, useState} from 'react';
import './Countries.css';
import axios from "axios";
import {CountriesType} from "../../types";
import Country from "../../components/Country/Country";
import ShowCountry from "../../components/ShowCountry/ShowCountry";

const Countries = () => {
  const [countries, setCountries] = useState<CountriesType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  let loading: string = '';
  if (countries.length === 0) {
    loading = 'Loading...';
  }

  const ctrs: string[] = [];


  countries.map(country =>
    ctrs.push(country.alpha3Code)
  );

  const getCountries = useCallback(async () => {
    const countriesResponse = await axios.get<CountriesType[]>('all/?fields=alpha3Code,name');
    const countriesArr = countriesResponse.data;
    setCountries(countriesArr);
  }, []);

  useEffect(() => {
    getCountries().catch(console.error)
  }, [getCountries]);

  return (
    <div className="blocks">

    <div className="sideBar">
      {loading}
      {countries.map(country =>
        <Country key={country.alpha3Code} country={country} onClick={() => setSelectedCountry(country.alpha3Code)}/>
      )}
    </div>

      <ShowCountry alphaCode={selectedCountry}/>

    </div>
  );
};

export default Countries;