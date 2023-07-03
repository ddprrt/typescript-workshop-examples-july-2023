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

// Start here

function task(): void {
  // contents tbd
}

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
