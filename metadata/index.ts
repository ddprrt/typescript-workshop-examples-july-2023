import type { Speakers } from "./models";

declare const speakers: Speakers;
const a = speakers["Stefan Baumgartner"];
if (a) {
  a.count;
}

type Speaker = {
  count: number;
  img: string;
}

type SpeakerMap = Record<string, Speaker>;

type Location = {
  lat: number;
  lng: number;
  name: string;
}

const speakerMap = new Map<string, Speaker>();

type Meetups = {
  speaker: Map<string, Speaker>;
  location: Map<string, Location>;
}

const key = "Stefan Baumgartner"
function update(map: Map<string, Speaker>, key: string) {
  if (map.has(key)) {
    const a = map.get(key);
    if (a) {
      a.count++;
      map.set(key, a);
    }
  }
}
