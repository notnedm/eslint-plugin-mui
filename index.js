import fs from "fs";
import enforceIconVariantRule from "./rules/enforce-icon-variant.js";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf8")
);

export default {
  meta: {
    name: pkg.name,
    version: pkg.version,
    namespace: "@notnedm-mui",
  },
  rules: {
    "enforce-icon-variant": enforceIconVariantRule,
  },
};
