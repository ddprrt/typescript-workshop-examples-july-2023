type VideoFormatURLs = {
  format1080p: URL;
  format720p: URL;
  format4k: URL;
  format320p: URL;
  format480p: URL;
}

// "format1080p" | "format720p" | "format4k" | "format320p"
type Split<T extends object> = {
  [K in keyof T]: {
    [P in K]: T[P];
  }
}[keyof T]

const Commands = ["add", "remove", "update", "list"] as const;
type Commands = (typeof Commands)[number];

function sendCommand(command: Commands) {

}

sendCommand("add")

function isCommand(command: string): command is Commands {
  for (let elem in Commands) {
    if (elem === command) {
      return true;
    }
  }
  return false
}

type Person = {
  name: string;
  age: number;
}

type SplitPerson = Split<Person>;


function loadFormat(formats: Split<VideoFormatURLs>) {

}

loadFormat({
  format480p: new URL(""),
})

export { }
