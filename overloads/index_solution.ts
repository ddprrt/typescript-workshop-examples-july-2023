// Write your own Gulp!
// Look at the API for `task` and make sure all variations below are
// well typed and give your users all the information they need

// Discuss
// - What are the gotchas of overloads?
// - Are there alternatives to overloads?
// - When would you use what?

type Pipeable = {
  pipe(task: Function): Pipeable;
};
declare function src(glob: string): Pipeable;
declare function dest(glob: string): () => Pipeable;

type Returnable = Pipeable | Promise<unknown>;

type Callback = () => Returnable;

function task2(taskName: string, arg1: Callback | string[], arg2?: Callback): void {

}
// Start here
// Usage signature
function task(taskName: string, deps: string[]): void
function task(taskName: string, cb: Callback): void
function task(taskName: string, deps: string[], cb: Callback): void
// Implementation signature
function task(taskName: string, arg1: Callback | string[], arg2?: Callback): void {
  if (Array.isArray(arg1)) {
    arg1.length
  } else {
    arg1();
  }

  if (typeof arg2 !== "undefined") {
    arg2
  }
}

type TaskFn = typeof task;


type Animal = {
  kind: string;
  age: number;
  id: number;
}

// Usage signature
function getElem(name: string): Person
function getElem(id: number): Animal
// Implementation signature
function getElem(param1: string | number): Person | Animal {
  if (typeof param1 === "number") {
    return {
      name: "Stefan",
      age: 41,
      profession: "Developer"
    }
  } else {
    return {
      kind: "Dog",
      age: 2,
      id: 1
    }
  }
}

interface Person {
  name: string;
  age: number;
}

interface Person {
  profession: string;
}


const animal = getElem(1);
animal.id * 2;


// Stop here

// The code below should work

// Define a task, execute the ones in the dependency array
task("default", ["scripts", "copy-styles"]);

// Define a task and execute a callback
task("scripts", () => {
  return src("src/*.js").pipe(dest("dest"));
});

// Define a task and execute a callback with done
task("styles", () => {
  return fetch("https://fettblog.eu/main.css")
    .then((res) => res.text())
    .then((text) => {
      dest(text);
    });
});

// A mixture
task("copy-styles", ["styles"], () => {
  return src("src/*.css").pipe(dest("dest"));
});


export { }
