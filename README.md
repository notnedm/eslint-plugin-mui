# @notnedm/eslint-plugin-mui

Collection of custom built ESLint rules targeted towards `@mui/*` dependencies.

## Installation

1. Add the package dependency `npm install @notnedm/eslint-plugin-mui`
2. Update your ESLint configuration file

```javascript
// eslint.config.js
const notnedMui = require("@notnedm/eslint-plugin-mui");

module.exports = {
  files: ["**/*.{jsx,tsx}"],
  plugins: { "@notnedm-mui": notnedMui },
  rules: {
    "@notnedm-mui/enforce-icon-variant": "error", // e.g. Enforced Filled (default) icon variants
    "@notnedm-mui/enforce-icon-variant": ["error", "Rounded"], // e.g. Enforced Rounded icon variants
  },
};
```

## Contributing

Contributors are very welcome to raise PRs, the main requirement is that you add tests to demonstrate what your rule achieves.

## Development

1. `git clone https://github.com/notnedm/eslint-plugin-mui.git`
2. `yarn`

### Building

1. `yarn build` will put files for deployment into `./dist`

### Adding a new rule

1. Add a new file in the [`rules`](./rules) directory following the naming pattern `${ruleName}.js` e.g. `rules/enforce-icon-variant.js`
2. Add an example configuration to [`rules/README.md`](./rules/README.md)
3. Import the rule to [`./index.js`](index.js)

### Testing

To run tests use `yarn test`

When added tests, add the new test file in the [`tests`](./tests) directory following the naming pattern `${ruleName}.test.js` e.g. `tests/enforce-icon-variant.test.js`.

> This will ensure it gets handled correctly by the test runner in `tests/index.js`
