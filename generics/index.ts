type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
  format4k: URL
}

type SubtitleURLs = {
  english: URL;
  japanese: URL;
  spanish: URL;
  french: URL;
  german: URL;
  italian: URL;
  portuguese: URL;
  russian: URL;
  korean: URL;
}

type URLList = {
  [x: string]: URL
}

function isAvailable<Format extends object>(
  formats: Format,
  key: PropertyKey
): key is keyof Format {
  return key in formats;
}

function loadFormats<T extends URLList, K extends keyof T>(formats: T, key: K): K {
  fetch(formats[key]);
  return key;
}

declare const videoFormats: VideoFormatURLs;
declare const subtitles: SubtitleURLs;

declare const format: string;

if (isAvailable(videoFormats, format)) {
  let k = loadFormats(videoFormats, format);
  k = loadFormats(videoFormats, "format1080p");
}

//@ts-expect-error
loadFormats(videoFormats, format);
//@ts-expect-error
loadFormats(subtitles, format);

if (isAvailable(subtitles, format)) {
  loadFormats(subtitles, format);
}

type Person = {
  name: string;
  age: number;
  profession: string;
}

type InterestingKeys = "age";

type Select<T, K extends keyof T> = {
  [P in K]: T[P]
}

type InterestingPerson = Select<Person, "name" | "profession">;

type RequiredProperties<T> = {
  [P in keyof T]-?: T[P]
}

type OptionalProperties<T extends { name: any }, K extends keyof T = "name"> = {
  [P in K]?: T[P]
}


type OptionalPerson = OptionalProperties<Person, "age">
function createPerson(): Partial<Person> {
  return {
    age: 41,
  }
}
const person = createPerson().age?.toString();

const defaultOptions = {
  source: "src",
  dest: "dest",
  override: true,
}

function copy(options: Partial<typeof defaultOptions>) {
  const finalOptions = { ...defaultOptions, ...options };
}

function readPerson(person: Readonly<Person>) {
  //@ts-expect-error
  person.name = "John"
}

const person2 = { name: "John", age: 41, profession: "developer" };
readPerson(person2)

copy({})

declare const people: Person[];

type Animal = {
  id: number,
  kind: string,
}

declare const animals: Animal[];

function merge<T extends (Person | Animal)[]>(
  dest: T, source: T
) {
  dest.push(...source);
}

merge<(Animal | Person)[]>(people, animals);

for (let elem of people) {
  console.log(elem.age * 2);
}
