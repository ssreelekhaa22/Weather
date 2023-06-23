export const apiKey = process.env.REACT_APP_API_KEY;

export const API_URL = "https://api.openweathermap.org/";
export const toFahrenheit = (kelvin) => {
  return toCelsius(kelvin) * 1.8 + 32;
};

export const toCelsius = (kelvin) => {
  return kelvin - 273.15;
};
