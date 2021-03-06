import axios from "axios";
import { getKeyValue } from "./storage.service.js";

const getIcon = icon => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "âī¸";
    case "02":
      return "đ¤ī¸";
    case "03":
      return "âī¸";
    case "04":
      return "âī¸";
    case "09":
      return "đ§ī¸";
    case "10":
      return "đĻī¸";
    case "11":
      return "đŠī¸";
    case "13":
      return "âī¸";
    case "50":
      return "đĢī¸";
  }
};

const getWeather = async () => {
  const city = await getKeyValue("city");

  if (city) {
    const coordinates = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
      params: {
        q: city,
        limit: 1,
        appid: process.env.TOKEN,        
      },
    });

    if (coordinates) {
      //console.log("coordinates", coordinates);
      const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: coordinates?.data?.[0]?.lat,
          lon: coordinates?.data?.[0]?.lon,
          appid: process.env.TOKEN,
          lang: "en",
          units: "metric",
        },
      });
      return data;
    }
  } else {
    throw new Error("No city found. Please provide it with the -s [CITY_NAME].");
  }
};

export { getWeather, getIcon };
