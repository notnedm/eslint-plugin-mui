import fs from "fs";

const VARIANT_SUFFIX_MAP = {
  Filled: "",
  Outlined: "Outlined",
  Rounded: "Rounded",
  TwoTone: "TwoTone",
  Sharp: "Sharp",
};

export default {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [{ enum: Object.keys(VARIANT_SUFFIX_MAP) }],
    docs: {
      description: "Enforce the usage of a particular variant of MUI icon",
    },
  },
  create(context) {
    const [variant = "Filled"] = context.options;
    const expectedSuffix = VARIANT_SUFFIX_MAP[variant];
    function checkHasExpectedSuffix(name) {
      if (variant !== "Filled" && String(name).endsWith(expectedSuffix)) {
        return true;
      }
      if (
        variant === "Filled" &&
        !Object.values(VARIANT_SUFFIX_MAP)
          .slice(1)
          .some((x) => String(name).endsWith(x))
      ) {
        return true;
      }
    }
    function getExpectedIconName(name) {
      const suffixIterator = name.match(
        /(\w+)(Outlined|Rounded|TwoTone|Sharp)+$/
      );
      const iconName =
        (suffixIterator?.length ?? 0) > 0 ? suffixIterator[1] : name;

      return `${iconName}${expectedSuffix}`;
    }
    function checkIfVariantExists(name) {
      const iconPath = `${process.cwd()}/node_modules/@mui/icons-material/${name}.js`;
      return fs.existsSync(iconPath);
    }
    return {
      ImportDeclaration(node) {
        const packageName = node.source.value;
        if (!Object.keys(VARIANT_SUFFIX_MAP).includes(variant)) return; // ignore invalid variants
        if (!/^@mui\/icons-material/.test(packageName)) return; // ignore irrelevant packages
        if (node.specifiers.length === 0) return; // nothing to analyse

        // establish if default import, e.g. import SettingsIcon from '@mui/icons-material/Settings;'
        // or
        // specifier import e.g. import { Settings } from '@mui/icons-material';
        const isDefaultImport =
          node.specifiers?.[0].type === "ImportDefaultSpecifier";

        // validate if expected suffix is used
        if (isDefaultImport) {
          // default import, e.g. import SettingsIcon from '@mui/icons-material/Settings;'
          if (checkHasExpectedSuffix(packageName)) return;

          // extract iconName and existing suffix
          const [_, iconWithSuffix] = packageName.match(
            /^@mui\/icons-material\/(\w+)$/
          );
          const expectedIconName = getExpectedIconName(iconWithSuffix);
          if (!checkIfVariantExists(expectedIconName)) return; // intended variant doesn't exist, ignore

          context.report({
            node: node.source,
            message: `Use the intended ${variant === "Filled" ? "Filled (default)" : variant} variant of ${iconWithSuffix}.`,
            fix(fixer) {
              const quote = node.source.raw[0];
              return fixer.replaceText(
                node.source,
                `${quote}@mui/icons-material/${expectedIconName}${quote}`
              );
            },
          });
          return;
        }

        node.specifiers.forEach((x) => {
          if (checkHasExpectedSuffix(x.imported.name)) return;

          const expectedIconName = getExpectedIconName(x.imported.name);
          if (!checkIfVariantExists(expectedIconName)) return;

          context.report({
            fix(fixer) {
              return fixer.replaceText(
                x.imported,
                `${expectedIconName} as ${x.imported.name}`
              );
            },
            message: `Use the intended ${variant === "Filled" ? "Filled (default)" : variant} variant of ${x.imported.name}.`,
            node: x.imported,
          });
        });
      },
    };
  },
};
