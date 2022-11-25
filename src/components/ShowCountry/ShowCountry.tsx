import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import './ShowCounrty.css';
import axios from "axios";
import {CountryType} from "../../types";

interface Props {
  alphaCode: string;
}

const ShowCountry: React.FC<Props> = ({alphaCode}) => {
  const [country, setCountry] = useState<CountryType>({
    name: '',
    capital: '',
    population: 0,
    borders: [],
    flags: {png: ''},
  });

  const [selectedBorders, setSelectedBorders] = useState<string[]>([]);
  const [selectedBOrdersName, setSelectedBordersName] = useState<string[]>([]);

  const getCountry = useCallback(async () => {
    const countryResponse = await axios.get<CountryType>('alpha/' + alphaCode);
    const countryObject = countryResponse.data;
    setCountry(countryObject);
    if (countryObject.borders !== undefined) {
      setSelectedBorders(countryObject.borders);
    }
  }, [alphaCode]);

  useEffect(() => {
    if (alphaCode !== '') {
      getCountry().catch(console.error);
    }
  }, [alphaCode,getCountry]);

  let bordersList: ReactNode;
  let showedCountryBlock: ReactNode;

  /*const getBordersName = useCallback(async () => {
    const bordersArrObjResponse = selectedBorders.map(async borderAlphaCode => {
      await axios.get('alpha/' + borderAlphaCode);
      const results = await Promise.all(bordersArrObjResponse);
      console.log(results);}
    }, []);*/

  const getBordersName = useCallback(async () => {
    const borderArrObjPromisses = selectedBorders.map(async borderAlpha => await axios.get('alpha/' + borderAlpha));
    const borderCountriesArrResponse = await Promise.all(borderArrObjPromisses);
    const borderArr: string[] = borderCountriesArrResponse.map(obj => obj.data.name);
    setSelectedBordersName(borderArr);
  }, [selectedBorders]);

  useEffect(() => {
    if (selectedBorders.length !== 0) {
      getBordersName();
    }
  }, [selectedBorders.length,getBordersName]);

  if (country.borders !== undefined) {
    bordersList = (<>
      {selectedBOrdersName.map(borderName => <li key={borderName}>{borderName}</li>)}
    </>);
  } else {
    bordersList = (<p>Нет граничащих стран</p>);
  }

  if (country.name !== '' && country.name !== undefined) {
    showedCountryBlock = (<>
      <div className="countryInfoAndFlag">
        <div className="countryInfo">
          <h2>{country.name}</h2>
          <p><b>Capital:</b> {country.capital}</p>
          <p><b>Population:</b> {country.population}</p>
        </div>

        <div className="countryFlag">
          <img src={country.flags.png} alt="flag" className="countryFlag"/>
        </div>
      </div>

      <div className="countryBorders">
        <h4>Borders with:</h4>
        <ul>
          {bordersList}
        </ul>
      </div>
    </>);
  } else {
    showedCountryBlock = (<p>Выберите страну</p>);
  }


  return (
    <div className="ShowCountry">
      {showedCountryBlock}
    </div>
  );
};

export default ShowCountry;