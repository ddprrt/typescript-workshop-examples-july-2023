/*
- Create a function that wraps an existing function f
- It’s meant to safely execute f, putting the execution in a try/catch block
- If the execution is successful, it returns a status object of status: “success” and the value
- If it isn’t it should return a status: “error” and the error
- Think about function arguments as a tuple
- Add generics for the arguments and the return value
*/

function addStatus(func: unknown) {
  return function(
    ...args: unknown
  ): unknown {
    try {
      const val = func(...args);
      // TODO
      // Return Status success and value
    } catch (e: unknown) {
      // TODO
      // Return Status error and the error
    }

  };
}

function x() {
  return 1;
}

const safeX = addStatus(x);
const result = safeX();

function add1(num: number) {
  return num + 1;
}

const safeAdd1 = addStatus(add1)(2)
const result2 = safeAdd1(2);
