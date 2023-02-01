// Create an array with 3 items. All items should be functions. Iterate through the array and call all the functions.
const funcArray = [funcA, funcB, funcC];
function funcA() {
  console.log("a");
}
function funcB() {
  console.log("b");
}
function funcC() {
  console.log("c");
}
for (let i = 0; i < funcArray.length; i++) {
  funcArray[i];
}

// Create a function as a const and try creating a function normally. Call both functions.
const varFunc = function () {
  console.log("foo");
};
function justFunc() {
  console.log("bar");
}
varFunc();
justFunc();

// Create an object that has a key whose value is a function. Try calling this function.
const obj = {
  item: () => console.log("I called this function from an object"),
};
obj.item();
