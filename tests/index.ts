import type { Expect, Equal } from "./tests.d";

type PathParam<P extends string> =
  P extends `${`/${string}` | ""}/:${infer Param}/${infer Rest}` ? Param | PathParam<`/${Rest}`> :
  P extends `${`/${string}` | ""}/:${infer Param}` ? Param : never;

type T1 = Expect<Equal<PathParam<"/users/:userid">, "userid">>;
type T2 = Expect<Equal<PathParam<"/:id">, "id">>;
type T3 = Expect<Equal<PathParam<"/users">, never>>;
type T4 = Expect<Equal<PathParam<"/users/:userid/collection">, "userid">>;
type T5 = Expect<Equal<
  PathParam<"/users/:userid/collection/:collectionid">,
  "userid" | "collectionid"
>>;
