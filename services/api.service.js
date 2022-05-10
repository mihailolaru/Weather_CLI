import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getWeather = async city => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) throw new Error("No token found. Please provide it with the -t [API_KEY].");
  //We also could use backticks but this syntax is not very secure.
  //const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

  // Bellow the request is done with node native module https. But it can be done with libraries like axios or fetch. For example
  //
  // const {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather",
  // 	params:{
  //   lat: lat,
  //   lon: lon,
  //   appid: token,
  //   lang: "en",
  //   units: "metric",
  //  }
  // );
  //
  //   return data;

  //Get coordinates by location name.
  const coordinatesURL = new URL("https://api.openweathermap.org/geo/1.0/direct");
  coordinatesURL.searchParams.append("q", city);
  coordinatesURL.searchParams.append("limit", 1);
  coordinatesURL.searchParams.append("appid", token);

  https.get(coordinatesURL, response => {
    let coordinatesRes = [];

    response.on("data", chunk => {
      coordinatesRes += chunk;
    });

    response.on("end", () => {
      console.log("res", coordinatesRes);
      if (coordinatesRes.length > 0) {
        const coordinates = JSON.parse(coordinatesRes)[0];
        // Get weather data.
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.searchParams.append("lat", coordinates?.lat);
        url.searchParams.append("lon", coordinates?.lon);
        url.searchParams.append("appid", token);
        url.searchParams.append("lang", "en");
        url.searchParams.append("units", "metric");

        https.get(url, response => {
          let res = "";

          response.on("data", chunk => {
            res += chunk;
          });

          response.on("end", () => {
            console.log("res", res);
          });

          response.on("error", error => {
            console.log("error", error);
          });
        });
      }
    });

    response.on("error", error => {
      console.log("error", error);
    });
  });
};

export { getWeather };
