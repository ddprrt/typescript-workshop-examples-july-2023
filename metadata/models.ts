export type Speakers = {
  [x: string]: {
    count: number;
    img: string
  } | undefined
}

export namespace Speakers {
  interface Speaker {
    count: number;
  }
  export function getSpeaker(name: string): Speaker | undefined {
    return undefined
  }
}
