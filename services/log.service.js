// chalk is used to color the output.
import chalk from "chalk";
import dedent from "dedent-js";
import { getIcon } from "./api.service.js";

const printError = error => {
  console.log(chalk.bgRed(" error "), error);
};

const printSuccess = message => {
  console.log(chalk.bgGreen(" SUCCESS "), message);
};

//dedent is used to remove extra indentation.
const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP")}
		No parameters - display weather forecast
		-s - [CITY] for setting the city
		-h - for help
		-t - [API_KEY] for setting the token
		`
  );
};

const printWeather = ( res, icon ) => {
	  console.log(
		dedent`${chalk.bgYellow("WEATHER")} Weather in ${res?.name} 
		${getIcon(res?.weather?.[0]?.icon)} ${res?.weather?.[0]?.description}
		Temperature: ${res?.main?.temp}°C (feels like ${res?.main?.feels_like}°C)
		Humidity: ${res?.main?.humidity}%
		Wind speed: ${res?.wind?.speed} m/s
		`
	  );
};

export { printError, printSuccess, printHelp, printWeather };
