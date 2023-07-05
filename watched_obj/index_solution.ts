// String template literal types

// Create a function makedWatchedObject that takes an object
// and returns a proxy that allows you to listen to changes
//

const me = {
  firstName: "Stefan",
  lastName: "Baumgartner",
  age: 40,
  isTeaching: true,
};

function eventName(t: string = "") {
  return `${t}Changed`;
}

const x = eventName("firstName");

type EventName<T extends string = string> = `${T}Changed`;
type A = EventName<"firstName">

type Me = typeof me;

type Keys = `${keyof Me}Changed`;
type Types = Me[keyof Me]


function makeWatchedObject<T extends object>(obj: T) {
  const events: Record<string, Function[]> = {};
  const eventHandler = {
    on<K extends keyof T & string>(event: `${K}Changed`, cb: (val: T[K]) => void) {
      events[event] = events[event] || [];
      events[event].push(cb)
    }
  }
  const proxy = new Proxy(obj, {
    set(target, prop, val) {
      console.log("Here???")
      if (prop in target && typeof prop === "string") {
        target[prop] = val;
        for (let event of events[`${prop}Changed`]) {
          event(val);
        }
        return true;
      }
      return false;
    }
  })
  return {
    ...proxy,
    on<K extends keyof T & string>(event: `${K}Changed`, cb: (val: T[K]) => void) {
      events[event] = events[event] || [];
      events[event].push(cb)
    },
  }
}

const person = makeWatchedObject({
  firstName: "Stefan",
  lastName: "Baumgartner",
  age: 40,
  isTeaching: true,
})

person.on("firstNameChanged", (newValue) => {
  console.log("First name has changed to", newValue)
})

//@ts-expect-error
person.on("nameChanged", (newValue) => {
  console.log("First name has changed to", newValue)
})

const doll = makeWatchedObject({
  name: "Marshall",
  brand: "Paw Patrol",
  hasCar: true
})
/*
doll.on("hasCarChanged", (newValue) => {
  if (newValue) {
    console.log("Marshall has a car!")
  }
  })*/

const lego = makeWatchedObject({
  model: 6066,
  name: "Camouflaged Outpost",
  year: 1987
})

lego.on("modelChanged", (ev) => {
  console.log("Halloooooo", ev)
})

lego.model = 1989;

const super_car = makeWatchedObject({
  model: 8880,
  name: "Super Car",
  year: 1994
})

//lego.on("yearChanged", (newValue) => { })

export { }
