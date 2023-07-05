const app = {
  get
}

const map = new Map();

function get(path: any, callback: any) {
  if (!map.has(path)) {
    map.set(path, []);
  }
  map.get(path).push(callback);
}


app.get("/users/:userid", (req: any, res: any) => {
  if (req.method === "POS") {
    res.status(30).send(`Hello ${req.params.userId}`);
  }
})

app.get("/users/:userid", (req: any, res: any) => {
  if (req.method === "POST") {
    res.status(200).send(`Hello ${req.params.userId}`);
  }
})


app.get(20, 30)
