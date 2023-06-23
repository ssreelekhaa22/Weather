# Weather App

This is a simple weather app built with React. It allows you to search for a city and displays the current weather and forecast for the selected location.

- Design:[Figma](https://www.figma.com/file/PXcD0nDkdC5Qxl9bMVWfXj/Untitled?type=design&node-id=0-1&t=vdkfhxZN9wk2yorJ-0)
- Deployment: [Vercel](weather-snowy-three.vercel.app)

## Features

- Search for a city and retrieve weather information
- Display current weather conditions
- Show forecast for the next few days
- Customizable styling for different weather conditions

## Getting Started

To get started with the app, follow these steps:

1. Clone the repository: `git clone https://github.com/ssreelekhaa22/Weather.git`
2. Navigate to the project directory: `cd src`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Folder Structure

- The `components` folder contains the reusable components used in the app.
- The `api` folder contains the API configuration and utility functions.
- `App.js` is the main component that renders the app.
- `index.js` is the entry point of the app.

## Dependencies

The app uses the following dependencies:

- React: A JavaScript library for building user interfaces.
- react-select-async-paginate: A React component for async paginated dropdown/select.
- tailwindcss: A utility-first CSS framework.

These dependencies are already listed in the `package.json` file.

## API Key

To retrieve weather data, the Open Weather app requires an API key from a weather service provider. Follow the steps below to set up the API key:

1. Sign up or log in to your account at the weather service provider's website.
2. Generate an API key for accessing the weather data.
3. Copy the API key and open the `src/api/index.js` file.
4. Replace `YOUR_API_KEY` with your actual API key in the `apiKey` constant.

