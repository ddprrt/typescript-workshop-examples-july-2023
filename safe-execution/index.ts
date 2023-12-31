/*
- Create a function that wraps an existing function f
- It’s meant to safely execute f, putting the execution in a try/catch block
- If the execution is successful, it returns a status object of status: “success” and the value
- If it isn’t it should return a status: “error” and the error
- Think about function arguments as a tuple
- Add generics for the arguments and the return value
*/

type Result<T> = {
  status: "success",
  value: T
} | {
  error: unknown,
  status: "error"
}

function addStatus<Params extends unknown[], Rtn>(func: (...args: Params) => Rtn) {
  return function(
    ...args: Params
  ): Result<Rtn> {
    try {
      const value = func(...args);
      // TODO
      // Return Status success and value
      return {
        status: "success",
        value
      }
    } catch (e: unknown) {
      // TODO
      // Return Status error and the error
      return {
        status: "error",
        error: e
      }
    }

  };
}

function x() {
  return 1;
}

const safeX = addStatus(x);
const result = safeX();
if (result.status === "success") {
  result.value
}

function add1(num: number) {
  return num + 1;
}

const safeAdd1 = addStatus(add1);
const result2 = safeAdd1(1);

function complex_function(alpha: number, beta: string, gamma: boolean) {
  return 1;
}

const safe_complex_function = addStatus(complex_function);
const result3 = safe_complex_function(1, "a", true);
