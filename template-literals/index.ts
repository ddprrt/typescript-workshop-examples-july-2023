type MyEvent = `on${Capitalize<string> | number}`;

const event_name: MyEvent = "onClick";

type HeadingLevel = 1 | 2 | 3;
type HeadingTag = `${"h" | "H"}${HeadingLevel}`;

type TagIsHeading<T extends string> = T extends `${"h" | "H"}${HeadingLevel}` ? true : false;

type T1 = TagIsHeading<"H1">;
type T2 = TagIsHeading<"div">;

type GetHeadingLevel<T extends string> =
  T extends `${"h" | "H"}${infer R extends HeadingLevel}` ? R : never;

type T3 = GetHeadingLevel<"H1">;

function getHeadingLevel<T extends HeadingTag>(tag: T): GetHeadingLevel<T> {
  return tag.slice(1) as unknown as GetHeadingLevel<T>;
}

function increaseLevel() {
  let level = getHeadingLevel("H1");
  return level++;
}



export { }
