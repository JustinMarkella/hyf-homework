"use strict"; // allows us to use only declared variables
let n = 0;
let m = 0;
for (let i = 0; i < process.argv.length; i++) {
  // in case that process.argv array shows us
  // in 0.index Node executable path and in 1.index
  // script path - we need to sort it out with checking
  // if it is Number or not. Also it helps us to sort out
  // string values
  if (!isNaN(parseInt(process.argv[i]))) {
    n += parseInt(process.argv[i]);
    m += 1;
  }
}
// if no arguments are provided
if (isNaN(n / m)) {
  console.log("Please enter some numbers");
} else {
  console.log(n / m);
}
