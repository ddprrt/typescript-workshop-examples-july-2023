type Person = {
  name: string;
  age: number;
};

function copyProperty<K extends keyof Person>(a: Person, b: Person, k: K) {
  let value = b[k];
  a[k] = b[k];
}

const a: Person = {
  name: "Stefan",
  age: 30,
}

const b: Person = {
  name: "Copilot",
  age: 10,
}

const k: keyof Person = "name";

a[k] = b[k];

copyProperty(a, b, "name");

type Switch = {
  status: 0 | 1;
  id: number;
}

const s: Switch = {
  status: 0,
  id: 1,
}
declare const key: "status";
declare const key2: keyof Switch;
const value = s[key];
s[key2] = value;



const actions = ["CREATE", "READ", "UPDATE", "DELETE"] as const;
type Actions = typeof actions[number]

function isAction(action: string): action is Actions {
  return actions.reduce((acc, curr) => acc || curr === action, false);
}

function execute(action: Actions) {
  if (actions.includes(action)) {
    // Do something with action
  }
}
