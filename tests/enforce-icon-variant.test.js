import iconVariantRule from "../rules/enforce-icon-variant.js";
import RuleTester from "./rule-tester.js";

export default function () {
  const filledTester = new RuleTester({
    "rule-to-test/enforce-icon-variant": "error",
  });

  filledTester.test("enforce-icon-variant", iconVariantRule, {
    valid: [
      {
        code: "import SettingsIcon from '@mui/icons-material/Settings';",
      },
      {
        code: "import { Settings } from '@mui/icons-material';",
      },
      {
        code: "import { Settings, Add } from '@mui/icons-material';",
      },
    ],
    invalid: [
      {
        code: "import SettingsIcon from '@mui/icons-material/SettingsRounded';",
        output: "import SettingsIcon from '@mui/icons-material/Settings';",
        errors: 1,
      },
      {
        code: "import { SettingsRounded, AddRounded } from '@mui/icons-material';",
        output: "import { Settings, Add } from '@mui/icons-material';",
        errors: 2,
      },
      {
        code: "import { SettingsRounded, GitHub } from '@mui/icons-material';",
        output: "import { Settings, GitHub } from '@mui/icons-material';",
        errors: 1,
      },
    ],
  });

  const roundedTester = new RuleTester({
    "rule-to-test/enforce-icon-variant": ["error", "Rounded"],
  });

  roundedTester.test("enforce-icon-variant", iconVariantRule, {
    valid: [
      {
        code: "import SettingsIcon from '@mui/icons-material/SettingsRounded';",
      },
      {
        code: "import GitHubIcon from '@mui/icons-material/GitHub';",
      },
      {
        code: "import { SettingsRounded } from '@mui/icons-material';",
      },
    ],
    invalid: [
      {
        code: "import SettingsIcon from '@mui/icons-material/Settings';",
        output:
          "import SettingsIcon from '@mui/icons-material/SettingsRounded';",
        errors: 1,
      },
      {
        code: "import { Settings } from '@mui/icons-material';",
        output: "import { SettingsRounded } from '@mui/icons-material';",
        errors: 1,
      },
      {
        code: "import { Settings, Add } from '@mui/icons-material';",
        output:
          "import { SettingsRounded, AddRounded } from '@mui/icons-material';",
        errors: 2,
      },
    ],
  });
}
