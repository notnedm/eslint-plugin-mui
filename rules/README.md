# Rules

## enforce-icon-variant

Enforces usage of [@mui/icons-material](https://mui.com/material-ui/material-icons/) variants when a desired variant exists, e.g.

```javascript
/* eslint @notnedm-mui/enforce-icon-variant: ["error", "Rounded"] */

// ✅ valid because using intended Rounded variant
import { SettingsRounded } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/SettingsRounded";

// ❌ invalid because SettingsRounded exists
import { Settings } from "@mui/icons-material";

// ✅ valid because GitHubRounded doesn't exist
import { GitHub } from "@mui/icons-material";
```

The rule supports quick fixes to quickly clean up any existing project you add it to with `eslint . --fix`

```javascript
// ❌
import { Settings } from "@mui/icons-material";

// quick fixes to

// ✅
import { SettingsRounded } from "@mui/icons-material";
```
