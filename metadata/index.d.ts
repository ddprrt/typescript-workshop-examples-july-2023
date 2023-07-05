type Speakers = {
  [x: string]: {
    count: number;
    img: string
  }
}

type ArrayElem<T> = T extends Array<infer U> ? U : T;

interface Promise<T> {
  map<U>(fn: (el: ArrayElem<T>) => Promise<ArrayElem<U>> | ArrayElem<U>): Promise<U[]>;
}
