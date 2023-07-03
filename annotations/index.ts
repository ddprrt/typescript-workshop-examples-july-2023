// Add type annotations to functions and bindings to
// make sure the code at the end of this file works

// Discuss:
// - What other possibilities do you have?
// - What happens when you add an annotation?
// - What is the least amount of effort to keep types up to date?

type Repository = {
  url: string;
  createdAt: Date;
  kind: "git" | "mercurial";
};

// Here starts your work

function createRepository(kind: unknown, name: string) {
  return {
    url: `https://my-beautiful-repo-site.com/${name}`,
    createdAt: new Date(),
    kind,
  };
}

const repo = createRepository("git", "nocturnal-octocat");

const otherRepo = {
  url: "https://my-beautiful-repo-site.com/search-engine",
  createdAt: new Date(),
  kind: "git",
};

// Stop here

function printRepository(repo: Repository) {
  console.log(repo.url, repo.kind, repo.createdAt);
}


// Make this code work
printRepository(repo);
printRepository(otherRepo);
