#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";
import 'dotenv/config';

//Helper function in order to call the writing function and handle the error. done here in order not to load to much the syntax of the storage.service.js file.
const saveDataToFile = async (key, data) => {
  if (!data.length) {
    printError(`No ${key} passed.`);
    return;
  }

  try {
    await saveKeyValue(key, data);
    printSuccess(`${key} saved successfully.`);
  } catch (e) {
    printError(e.message);
    //In a real app in case you have an error in the file like syntax error you would have to include a way to change the file or remove the file.
  }
};

const getForecast = async () => {  
  try{ 
      const weather = await getWeather();     
      printWeather(weather);    
    } catch (e) {   
      console.log("e?.response?.status", e?.response?.status);
      if( e?.response?.status === 404 ){
          printError("Incorrect city name.");
      } else if (e?.response?.status === 401) {
          printError("Incorrect token.");
      } else {
          printError(e?.message);
      }   
  }
};

const initCLI = () => {
  //Getting the cmd args. You can optionally use tools like Yargs for this purpose.
  const args = getArgs(process.argv);
  //console.log("args", args);
  if (args.h) {
    //if arg is 'h' output the help info.
    return printHelp();
  }
  if (args.s) {
    //If arg is 's', save the city.
    return saveDataToFile("city", args.s);
  }  
  //if none of the above display the weather or any other action.
  return getForecast();
};

initCLI();
