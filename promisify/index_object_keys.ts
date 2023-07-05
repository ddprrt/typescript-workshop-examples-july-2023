type Person = {
  name: string;
  age: number;
};

function printPerson(p: Person) {
  Object.keys(p).forEach((k) => {
    console.log(k, p[k]);
  });
}
