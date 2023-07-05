// Type promisify using variadic tuple types
function promisify<
  T extends any[], R
>(f: (...args: [...T, (err: Error | null, args: R) => void]) => void): (...args: T) => Promise<R> {
  return function(...args: T) {
    return new Promise((resolve, reject) => {
      function callback(error: Error | null, result: R) {
        if (error) {
          reject(error);
        }
        resolve(result)
      }
      args.push(callback);
      f.call(null, ...args)
    })
  }
}

declare function load(file: string, encoding: string, callback: (err: Error, result: string) => void): void

const loadAsync = promisify(load);

loadAsync("./text.md", "utf-8").then(res => {
  console.log(res.toUpperCase())
})

type Messages = 'open' | 'write' | 'end' | 'error'
declare function on(msg: Messages, callback: (err: Error, msg: { type: Messages, content: string }) => void): void

const onAsync = promisify(on)
onAsync("open").then(res => {
  console.log(res.content);
})

declare function httpGet(url: URL, method: string, callback: (err: Error, result: string) => void): void

const onAsyncHttpGet = promisify(httpGet);
onAsyncHttpGet(new URL("..."), "GET").then(result => {

})

export { }
