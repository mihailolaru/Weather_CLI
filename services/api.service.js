import axios from "axios";
import { getKeyValue } from "./storage.service.js";

const getWeather = async () => {  
  const city = await getKeyValue("city");  

  if(city){
    const coordinates = await axios.get("https://api.openweathermap.org/geo/1.0/direct",
      {
        params:{
          q: city,
          limit: 1,
          appid: process.env.TOKEN,
        }
      }
    )

    if(coordinates){    
      const weather = await axios.get("https://api.openweathermap.org/data/2.5/weather",
      {
        params:{
        lat: coordinates.data[0].lat,
        lon: coordinates.data[0].lon,
        appid: process.env.TOKEN,
        lang: "en",
        units: "metric",
    }
    })
    return weather?.data;
  }
  } else {
    throw new Error("No city found. Please provide it with the -s [CITY_NAME].");
  }
};

export { getWeather };