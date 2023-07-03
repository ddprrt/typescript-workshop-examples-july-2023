type ToyBase = {
  name: string,
  description: string,
  stock: number
}

// Define here

type Puzzle = ToyBase & {}

type Doll = ToyBase & {}

interface BoardGame extends ToyBase {
}


// Create a union type of all toys
type Toy = unknown;


function printToy(toy: Toy) {
  // Print the toy with all its features.
  // Use pattern matching
}

// Try to get all kinds of toys in a union type
type ToyKind = unknown

export { }
