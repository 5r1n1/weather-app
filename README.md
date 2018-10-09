# weather-app
Notes app created as part of NodeJS online course

Usage: node app.js -a "some address"

The app will call Google Maps API with the provided address to get the following information
1. Formatted Address
2. Latitude
3. Longitude

The app will then invoke DarkSky weather api with the location information from the previous call to fetch the following weather conditions for that location
1. Current Temperature
2. Current Weather condition
3. Weather forecast for the rest of the day
4. Weather forecast for the rest of the week

This project teaches the following:
1. To make web api calls from NodeJS
2. Usage of promises and promise chaining
3. Usage of Yargs package

Thank you Andrew Mead 🙏
