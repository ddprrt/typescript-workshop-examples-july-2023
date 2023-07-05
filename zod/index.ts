import { z } from "zod";
/*
type Person = {
  name: string;
  age: number;
  profession?: string;
  status: "active" | "inactive" | "registered";
  };*/
//type ApiResponse = { results: Person[] };

// Start Here

const Person = z.object({
  name: z.string(),
  age: z.number().min(0).max(99),
  homepage: z.string().url(),
  email: z.string().email(),
  profession: z.string().optional(),
  status: z.union([z.literal("active"), z.literal("inactive"), z.literal("registered")]).transform((val) => {
    if (val === "registered") {
      return "active";
    }
    return val;
  })
});

const ApiResponse = z.object({
  results: z.array(Person)
})

type Person = z.infer<typeof Person>;
type P1 = z.input<typeof Person>
type P2 = z.output<typeof Person>
type ApiResponse = z.infer<typeof ApiResponse>;

async function fetchData() {
  const data = await fetch("/api/response").then((res) => res.json());
  return ApiResponse.safeParse(data);
}

try {
  fetchData().then(res => {
    if (res.success) {
      const api_response: ApiResponse = res.data;
    } else {
      console.log(res.error.message);
    }
  }).catch(err => { })
} catch (e) {

}

const axios = {
  get<T>(url: string): Promise<T> {
    return fetch(url).then((res) => res.json());
  }
}

const data = axios.get<ApiResponse>("/api/persons")

export { }
