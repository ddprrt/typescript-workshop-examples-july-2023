// String template literal types
function makeWatchedObject<T extends object>(obj: T) {
  return {
    on<K extends string & keyof T>(event: `${K}Changed`, cb: (value: T[K]) => void) {

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

type Vertical = "top" | "middle" | "bottom"
type Horizontal = "left" | "center" | "right"

type Alignments = `${Lowercase<Vertical>}_${Lowercase<Horizontal>}`

export { }
