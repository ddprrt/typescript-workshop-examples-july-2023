// Type promisify using variadic tuple types
function promisify(f: any): (...args: any[]) => Promise<any> {
  return function(...args: any[]) {
    return new Promise((resolve) => {
      function callback(result: any) {
        resolve(result)
      }
      args.push(callback);
      f.call(null, ...args)
    })
  }
}

declare function load(file: string, encoding: string, callback: (result: string) => void): void

const loadAsync = promisify(load);

loadAsync("./text.md", "utf-8").then(res => {
  console.log(res.toUpperCase())
})

type Messages = 'open' | 'write' | 'end' | 'error'
declare function on(msg: Messages, callback: (msg: { type: Messages, content: string }) => void): void

const onAsync = promisify(load)
onAsync("open").then(res => {
  console.log(res.content);
})


export { }
