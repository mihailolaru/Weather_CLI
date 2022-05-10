// chalk is used to color the output.
import chalk from "chalk";
import dedent from "dedent-js";

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

export { printError, printSuccess, printHelp };
