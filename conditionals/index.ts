type Id = {
  label: number
}

type Tag = {
  tag: string
}

type Label<T extends string | number> =
  T extends number ? Id :
  T extends string ? Tag : never;

function getLabel<T extends number | string>(input: T): Label<T> {
  if (typeof input === "number") {
    return {
      label: input
    } as Label<T>
  } else {
    return {
      tag: input
    } as Label<T>
  }
}

const label = getLabel(1);
const label2 = getLabel('tag');

type UnpackArray<T> = T extends Array<infer R> ? R : T;
type Test1 = UnpackArray<string>

function workWithElements<T>(input: T) {
  return {
    value: input,
    getFirstElement(): UnpackArray<T> {
      if (Array.isArray(input)) {
        return input[0]
      }
      return input as UnpackArray<T>
    }
  }
}

const result = workWithElements(42);
const element = result.getFirstElement();

type Person = {
  name: string,
  age: number
}

type HasName = Pick<Person, "name">

type RemoveProperty<T, K extends keyof T> =
  Pick<T, Exclude<keyof T, K>>

type PersonWithNoName = Omit<Person, "name">

type A1 = Partial<Pick<Person, "name">>
type A2 = Omit<Person, "name">

type SetPropertiesOptional<T, K extends keyof T> =
  Partial<Pick<T, K>> & Omit<T, K>

type PersonWithOptionalName = Remap<SetPropertiesOptional<Person, "name">>

declare const p: PersonWithOptionalName

type Remap<T> = {
  [K in keyof T]: T[K]
}


export { }
