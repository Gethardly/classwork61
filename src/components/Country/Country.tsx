import React from 'react';
import {CountriesType} from "../../types";

interface Props {
  country: CountriesType;
  onClick: React.MouseEventHandler;
}

const Country: React.FC<Props> = ({country, onClick}) => {
  return (
    <p
      className="countryName"
      onClick={onClick}
    >
      {country.name}
    </p>
  );
};

export default Country;