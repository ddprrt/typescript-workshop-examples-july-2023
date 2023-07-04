// String template literal types

// Create a function makedWatchedObject that takes an object
// and returns a proxy that allows you to listen to changes

function makeWatchedObject<T extends object>(obj: T) {
  return {
    on(event: unknown, cb: (val: unknown) => void) {

    },
    ...obj
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

const doll = makeWatchedObject({
  name: "Marshall",
  brand: "Paw Patrol",
  hasCar: true
})

doll.on("hasCarChanged", (newValue) => {
  if (newValue) {
    console.log("Marshall has a car!")
  }
})

export { }
