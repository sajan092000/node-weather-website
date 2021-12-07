const request = require("request");
// const url =
//   "http://api.weatherstack.com/current?access_key=ac6a369c4be60b33ce4669ee42181ad9&query=&units=f";

// request({ url: url, json: true }, (error, response) => {
//   //   console.log(error);
//   if (error) {
//     console.log("Unable to connect to the weather services!");
//     console.log(error);
//   }
//   else if(response.body.error){
//     console.log("Unable to find location")
//   }
//   else {
//     // const data=JSON.parse(response.body)
//     // console.log(data.current)
//     // console.log(response.body.current)

//     //challenge 1
//     // console.log("It is currently "+response.body.current.temperature + " degree out. It feels like "+response.body.current.feelslike +" degree out.")

//     //challenge 2
//     console.log(
//       response.body.current.weather_descriptions +
//         ", It is currently " +
//         response.body.current.temperature +
//         " degree out. There is " +
//         response.body.current.precip +
//         "% chance of rain"
//     );
//   }
// });

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic2FqYW5yYW5nYXJpIiwiYSI6ImNrd2Q1YjJ1cTNia2UycXA4YXhyOThuYWQifQ.kNgMwb8aDQkyHGLJ2H8RKw&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Please search another.", undefined);
    } else {
      // lng=body.features[0].center[0];
      // lat=body.features[0].center[1]
      // callback(undefined,["lat:"+lat,"lng:"+lng])
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
