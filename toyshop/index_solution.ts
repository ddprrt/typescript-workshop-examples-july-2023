type ToyBase = {
  name: string,
  description: string,
  stock: number
}

// Define here

// pieces
type Puzzle = ToyBase & {
  kind: "Puzzle",
  pieces: number
}

const Puzzle = {
  pieces: 2
}

type AnotherPuzzle = typeof Puzzle;

// material
type Doll = ToyBase & {
  kind: "Doll",
  material: "plush" | "plastic"
}

// players
interface BoardGame extends ToyBase {
  kind: "BoardGame",
  players: number
}

type VideoGame = ToyBase & {
  cartridge: boolean,
  system: "NES" | "SNES" | "N64" | "GameCube" | "Wii" | "WiiU" | "Switch";
  kind: "VideoGame"
}

function showBoardGame(boardGame: BoardGame) {
  console.log(boardGame.players);
}

function fetchData(): Promise<Toy[]> {
  return fetch("/my-backend").then(res => res.json())
}

const toys = await fetchData();
for (let toy of toys) {
  printToy(toy);
}

// Create a union type of all toys
type Toy = Doll | Puzzle | BoardGame | VideoGame;

function assertNever(input: never) {
  throw Error("Unkown toy" + input);
}

function printToy(toy: Toy) {
  switch (toy.kind) {
    case "BoardGame":
      showBoardGame(toy); break;
    case "Doll":
      console.log(`It's made of ${toy.material}`); break;
    case "Puzzle":
      console.log(`Puzzle with ${toy.pieces} pieces`); break;
    case "VideoGame":
      console.log(`It's for ${toy.system}`); break;
    default:
      assertNever(toy);
  }
  // Print the toy with all its features.
  // Use pattern matching
}

// Try to get all kinds of toys in a union type
// Index Access Type
type ToyKind = Toy["kind"];

// Grouped Toys: Mapped Types
type GroupedToys = {
  [K in ToyKind]: Extract<Toy, { kind: K }>[]
}

type SubTypeCheck<T, U> = T extends U ? T : never;
type T1 = SubTypeCheck<BoardGame, { kind: "Doll" }>;

function groupToysByKind(toys: Toy[]) {
  const groups: GroupedToys = {
    BoardGame: [],
    Doll: [],
    Puzzle: [],
    VideoGame: []
  }
  for (let elem of toys) {
    const group = groups[elem.kind]
    group.push(elem as any)
  }
  return groups;
}

export { }
