const app = {
  get, post, root
}

const getMap = new Map();
const postMap = new Map();


enum MethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE" | "CONNECT" | "PATCH";

type MyRequest<M extends Method, Path extends string> = {
  method: M,
  params: Record<PathParam<Path>, unknown>
}


type StatusCode =
  | 100 | 101 | 102 | 200 | 201 | 202 | 203 | 204
  | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302
  | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401
  | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409
  | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417
  | 418 | 420 | 422 | 423 | 424 | 425 | 426 | 428
  | 429 | 431 | 444 | 449 | 450 | 451 | 499 | 500
  | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508
  | 509 | 510 | 511 | 598 | 599;

type MyResponse = {
  contentType(type: string): MyResponse
  status(code: StatusCode): MyResponse
  send(body?: any): void
}

type Callback<
  M extends Method = Method,
  P extends string = string
> = (req: MyRequest<M, P>, res: MyResponse) => void

// Input: "/users/:userid"
// Output: "userid"
//
// Input: "/:id"
// Output: "id"
//
// Input "/users"
// Output: never
//
// Input: "/users/:userid/collection"
// Output: "userid"
//
// Input: "/users/:userid/collection/:collectionid"
// Output: "userid" | "collectionid"
type PathParam<P extends string> =
  P extends `${`/${string}` | ""}/:${infer Param}/${infer Rest}` ? Param | PathParam<`/${Rest}`> :
  P extends `${`/${string}` | ""}/:${infer Param}` ? Param : never;

type T1 = PathParam<"/users/:userid">;
type T2 = PathParam<"/:id">;
type T3 = PathParam<"/users">;
type T4 = PathParam<"/users/:userid/collection">;
type T5 = PathParam<"/users/:userid/collection/:collectionid">;

function get<P extends string>(path: P, callback: Callback<"GET", P>) {
  if (!getMap.has(path)) {
    getMap.set(path, []);
  }
  getMap.get(path).push(callback);
}

function post<P extends string>(path: P, callback: Callback<"POST", P>) {
  if (!postMap.has(path)) {
    postMap.set(path, []);
  }
  postMap.get(path).push(callback);
}

function root<M extends Method, P extends string>(path: P, methods: M[], callback: Callback<M, P>) {
  //...
}

app.root("/", ["GET", "POST"], (req, res) => {
  req.params;
})


app.get("/users/:userid", (req, res) => {
  //res.send();

  res.status(200).send(`Hello ${req.params.userid}`);

})

app.post("/users/:userid", (req, res) => {
  if (req.method === "POST") {

  }
})

app.get("/users/:userid/collection/:collectionid", (req, res) => {
  res.status(200).send(`Hello ${req.params.collectionid}`);

})

const callbackFn: Callback<"GET" | "POST" | "PUT"> = (req, res) => {
  if (req.method === "GET") {
    res.send();
  } else if (req.method === "POST") {
    res.status(200).send();
  } else if (req.method === "PUT") {
    res.status(200).send();
  }
}

app.get("/", callbackFn);
app.post("/", callbackFn);
//@ts-expect-error
app.root("/", ["CONNECT"], callbackFn);
