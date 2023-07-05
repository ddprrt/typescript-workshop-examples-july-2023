
function getFirstEntryOf(toys: Toy[], kind: ToyKind) {
  for (let elem of toys) {
    if (elem.kind === kind) {
      return elem;
    }
  }
  return null;
}

// Never
type SelectBase = {
  options: string[]
}

type SingleSelect = SelectBase & {
  value: string,
  values?: never
}

type MultiSelect = SelectBase & {
  values: string[];
  value?: never
}

type Select = SingleSelect | MultiSelect;

function selectCallback(param: Select) {
  if ("value" in param) {
    param.value
    // handle single cases
  } else if ("values" in param) {
    param.values
  }
}

selectCallback({
  options: ["dracula", "monokai"],
  values: ["dracula"]
})

// Control Flow Pain of Classes
function x(input: number | Toy) {
  if (typeof input === "object") {
    input
  }
}

function isPerson(value: NonNullable<unknown>): value is Person {
  return typeof value === "object"
    && "name" in value
    && typeof value.name === "string"
    && "age" in value
    && typeof value.age === "number";
}

class Person {
  name: string;
  age: number;
  #check: boolean;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.#check = true;
  }
}

const person = new Person("Stefan", 41);

class Animal {
  id: number;
  kind: string;
  #check: boolean;

  constructor(id: number, kind: string) {
    this.id = id;
    this.kind = kind;
    this.#check = true;
  }
}
const dog = new Animal(1, "Dog");

class Student extends Person {
  #check: boolean;
  constructor(name: string, age: number) {
    super(name, age);
    this.#check = true;
  }
}

function printElem(input: Person | Animal) {
  if (input instanceof Person) {
    console.log(input.name)
  } else {
    console.log(input.kind);
  }
}
printElem(person);
printElem(dog);
printElem(new Student("Stefan", 41));
//@ts-expect-error
printElem({ name: "Stefan", age: 41 })

enum Direction {
  Up, Down, Left, Right
}

function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      break;
    case Direction.Down:
      break;
    case Direction.Left:
      break;
    case Direction.Right:
      break;
  }
}

enum Role {
  Admin = "ADMIN",
  User = "USER",
  Moderator = "MODERATOR"
}

enum Role2 {
  Admin = "ADMIN",
  User = "USER",
  Moderator = "MODERATOR"
}

function closeThread(role: Role): boolean {
  switch (role) {
    case Role.Admin:
      return true;
    case Role.User: return false;
    case Role.Moderator: return true;
  }
}

//@ts-expect-error
closeThread(Role2.Admin);
//@ts-expect-error
closeThread("ADMIN")

type Roles = "ADMIN" | "USER" | "MODERATOR";
const Roles = {
  Admin: "ADMIN",
  User: "USER",
  Moderator: "MODERATOR"
} as const;

function closeThread2(role: Roles): boolean {
  return true;
}

closeThread2(Roles.Admin);
closeThread2("ADMIN");
