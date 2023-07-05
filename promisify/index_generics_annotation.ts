class Collection<T> {
  array: T[]
  constructor() {
    this.array = [];
  }

  add(item: T) {
    this.array.push(item);
  }
}

const a: Collection<string> = new Collection();
a.add("1");

function onlyPeople<T extends { name: string }>(p: T) {
  return p
}
const person = { name: "Stefan", age: 40 };
const return1 = onlyPeople(person);
return1.age
const person2 = { id: 5536500, name: "Stefan Baumgartner" };
const return2 = onlyPeople(person2)
