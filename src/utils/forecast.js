const request = require("request");
// //Geocoding
// //Address -> Lat/Lng -> Weather

// const geocodeUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/nagpur.json?access_token=pk.eyJ1Ijoic2FqYW5yYW5nYXJpIiwiYSI6ImNrd2Q1YjJ1cTNia2UycXA4YXhyOThuYWQifQ.kNgMwb8aDQkyHGLJ2H8RKw&limit=1";

// //challenge 3
// request({ url: geocodeUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to the location services!");
//     console.log(error);
//   } else if (response.body.features.length == 0) {
//     console.log("Please provide valid location");
//   } else {
//     console.log("Latitude: " + response.body.features[0].center[1]);
//     console.log("Longitude: " + response.body.features[0].center[0]);
//   }
//   // console.log(response.body.features.length)
// });

const forecast = (lat, lng, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ac6a369c4be60b33ce4669ee42181ad9&query=" +
    lat +
    "," +
    lng ;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to the weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Please search another.", undefined);
    } else {
      callback(
        undefined,
                  body.current.weather_descriptions +
                    ", It is currently " +
                    body.current.temperature +
                    " degree out. There is an " +
                    body.current.precip +
                    "% chance of rain."+
                   " It feels like "+body.current.feelslike +" degree out. There is "+body.current.humidity+"% humidity."
        
      );
      //   callback(undefined, {
      //     weather: response.body.current.weather_descriptions,
      //     temprature: response.body.current.temperature,
      //     chances_of_rain: response.body.current.precip,
      //   });
    }
  });
};

module.exports = forecast;
