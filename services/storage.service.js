import { homedir } from "os";
//join concatenates paths see documentation for more info
import { join } from "path";
// Instead of promise you can use "writeFile" or "writeFileSync" etc. Promise is a newer approach and more flexible.
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

const TOKEN_DICTIONARY = {
	token: "token",
	city: "city",
};

const saveKeyValue = async ( key, value ) => {
	//Data that will be written to the file.
	let data = {};
	//Check if the file exists ion order not to overwrite it.
	if(await fileExists(filePath)){
		const file = await promises.readFile(filePath);
		//Parse the file to JSON.
		data = JSON.parse(file);
	}

	data[key] = value;
	//Since promises.writeFile does not accept objects as a parameter, we need to convert it to a string.
	await promises.writeFile(filePath, JSON.stringify(data));	
};

//Get data from the storage function.
const getKeyValue = async key => {
	if(await fileExists(filePath)){
		const file = await promises.readFile(filePath);
		//Parse the file to JSON.
		const data = JSON.parse(file);
		return(data[key]);
	}
	return undefined;

};

//Check if file exists function.
const fileExists = async path => {
	try{
		await promises.stat(path);
		return true;
	}catch(e){
		return false;
	}
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };