#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
	//Getting the cms args. You can optionally use tools like Yargs for this purpose.
	const args = getArgs(process.argv);	
	console.log(args);
};

initCLI();