#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

//Helper function in order to call the writing function and handle the error. done here in order not to load to much the syntax of the storage.service.js file.
const saveToken = async token => {
  if (!token.length) {
    printError("No token passed.");
    return;
  }

  try {
    await saveKeyValue("token", token);
    printSuccess("Token saved successfully.");
  } catch (e) {
    printError(e.message);
    //In a real app in case you have an error in the file like syntax error you would have to include a way to change the file or remove the file.
  }
};

const initCLI = () => {
  //Getting the cmd args. You can optionally use tools like Yargs for this purpose.
  const args = getArgs(process.argv);
  console.log(args);
  if (args.h) {
    //if arg is 'h' output the help info.
    printHelp();
  }
  if (args.s) {
    //If arg is 's', save the city.
  }
  if (args.t) {
    //If arg is 't', save the token.
    //We return the promise that does the save operation.
    return saveToken(args.t);
  }
  getWeather("some city name here");
  //if none of the above display the weather or any other action.
};

initCLI();
