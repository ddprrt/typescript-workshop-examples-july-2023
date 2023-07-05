type UserSettings = {
  theme?: "default" | "monokai" | "dracula";
  language: string;
}

function getTheme(settings: UserSettings) {
  delete settings.theme;
  if (settings.theme) {
    return settings.theme;
  }
  return "default";
}

const a = getTheme({ language: "typescript" });
console.log(a); // "default"
const b = getTheme({ language: "typescript", theme: "monokai" })
console.log(b); // "monokai"
const c = getTheme({ language: "typescript", theme: undefined })
console.log(c);
