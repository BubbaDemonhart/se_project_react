# WTWR — What to Wear React App

WTWR is a React + Vite weather-driven wardrobe suggestion app. It fetches local weather data and recommends clothing items for hot, warm, cold, and other conditions.

## Features

- Current weather display, including temperature and location
- Clothing suggestions based on weather type
- Add new garment entries via modal form
- Preview item details in a popup modal
- Responsive modern UI with accessible form controls

## Technologies

- React 18
- Vite
- JavaScript / JSX
- CSS modules and custom styling
- Fetch API for OpenWeatherMap data

## Notes

- The app uses the OpenWeatherMap API via a provided API key in `src/utils/constants.js`.
- Clothing items are managed in React state and passed down from `App` to `Main`.
- The project includes basic client-side validation for the add garment form.
