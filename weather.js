#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
	//Getting the cms args. You can optionally use tools like Yargs for this purpose.
	const args = getArgs(process.argv);	
	console.log(args);
	if (args.h){
		//if arg is 'h' output the help info.
	}
	if (args.s){
		//If arg is 's', save the city.
	}
	if (args.t){
		//If arg is 't', save the token.
	}
	//if none of the above display the weather or nay other action.
};

initCLI();