export interface CountriesType {
  name: string;
  alpha3Code: string;
  independent: boolean;
}

export interface flagsIMG {
  svg?: string;
  png: string
}

export interface CountryType {
  name: string;
  capital: string;
  population: number;
  borders: string[];
  flags: flagsIMG;
}