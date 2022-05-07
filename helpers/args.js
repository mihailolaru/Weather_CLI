const getArgs = args => {
  const res = {};
  const [executer, file, ...rest] = args;
  //checking the args values
  rest.forEach((value, index, array) => {
    //Checking if the arg starts with an '-'
    if (value.charAt(0) == "-") {
		if(index == array.length - 1){
			//If the element with '-' is the last one
			res[value.substring(1)] = true;
     		 //If the next arg from the current on is not equal to '-'. Like '-s -h ...' - invalid arg.
		} else if (array[index + 1].charAt(0) != "-") {
		    res[value.substring(1)] = array[index + 1];
      	} else {
			res[value.substring(1)] = true;
	  }
    }
  });
  return res;
};

export { getArgs };