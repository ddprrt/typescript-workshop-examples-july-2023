const person: [age: number, name: string] = [41, "Stefan"];

function foo<T extends any[]>(first: string, ...args: T) {
  return args
}

const a = foo("Stefan", 1);
const b = foo("Stefan", 1, 2);
const c = foo("Stefan", 1, 2, 3, ":-)");

function writeFile(
  path: string,
  contents: string,
  writeMode: string,
  callback: (err: Error | null) => void) {
  //...
}

writeFile("home.md", "", "w+", (err) => {

})

function httpGet(
  url: URL,
  method: string,
  callback: (err: Error | null) => void) {
  // ..
}

httpGet(new URL("https://google.com"), "GET", (err) => {

});
type FunctionArguments = Parameters<typeof foo>

type CallbackFn = (err: Error | null) => void;

type BarFnArgs<T extends any[]> = [...T, CallbackFn];

type HTTPGetParams = BarFnArgs<[URL, string]>

function x<T extends any[]>(...args: BarFnArgs<T>) {

}
x(new URL("..."), "GET", () => {

})
x("contents.md", "...", "w+", () => {

})

function concat<
  T extends unknown[], U extends unknown[]
>(arr1: [...T], arr2: [...U]): [...T, ...U] {
  return [...arr1, ...arr2];
}

function useState<T>(initialState: T): [T, (newState: T) => void] {
  return [initialState, (newState: T) => { }];
}

const [state, updateState] = useState(3);

const concatResult = concat([1, 2, 3], ["a", "b", "c"]);
const concatResult2 = concat([1, 2], ["a"])

const arr_1 = [1, 2, 3];
const arr_2 = ["a", "b", "c"];


const concatResult3 = concat(arr_1, arr_2);
