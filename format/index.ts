// Type Format String Args using string template literal types and conditional types
type FormatStringArgs<T extends string> = unknown

declare function format<T extends string>(formatString: T, args: FormatStringArgs<T>): string

format("Hello {name}, you are {years} old", {
  name: "Stefan",
  years: 39
})

export { }
