import { RuleTester as EslintRuleTester } from "eslint";

class RuleTester {
  ruleTester;
  constructor(rules) {
    this.ruleTester = new EslintRuleTester({
      // Must use at least ecmaVersion 2015 because
      // that's when `const` variables were introduced.
      languageOptions: { ecmaVersion: 2015 },
      rules,
    });
  }

  test(ruleName, ruleCode, checks) {
    this.ruleTester.run(ruleName, ruleCode, checks);
  }
}

export default RuleTester;
