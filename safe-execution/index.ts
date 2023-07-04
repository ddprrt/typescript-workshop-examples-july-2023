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
