// Type Format String Args using string template literal types and conditional types
type FormatStringArgs<T> =
  T extends `${string}{${infer Word}}${infer Rest}` ? Word | FormatStringArgs<Rest> : never;

type Test1 = FormatStringArgs<"Hello {jambit}!">

function format<T extends string>(
  formatString: T, args: Record<FormatStringArgs<T>, { toString(): any }>
): string {
  let ret: string = formatString;
  for (let k in args) {
    ret = ret.replace(`{${k}}`, args[k].toString());
  }
  return ret;
}

let r1 = format("Hello {name}, you are {years} old", {
  name: "Stefan",
  years: 41
})
console.log(r1);

let r2 = format("Hello {friends}", {
  friends: "Jambit",
})

console.log(r2);

export { }
