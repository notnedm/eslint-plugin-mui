const fs = require("fs");

async function main() {
  console.log("⏳ Running tests...");
  try {
    await new Promise(async (resolve, reject) => {
      const tests = fs
        .readdirSync(`${process.cwd()}/tests`)
        .filter((x) => /.*\.test\.js$/.test(x))
        .map((x) => /(.*)\.test\.js$/.exec(x).slice(0, 2));

      let firstError = undefined;
      for (let i = 0; i < tests.length; i++) {
        const [fileName, ruleName] = tests[i];
        try {
          (await import(`./${fileName}`)).default();
          console.log(`   ✅ ${ruleName}`);
        } catch (error) {
          firstError ??= error;
          console.log(`   ❌ ${ruleName}`);
        }
      }

      if (firstError !== undefined && firstError instanceof Error)
        reject(firstError);

      resolve();
    });
    console.log("🎉 All tests passed successfully!");
  } catch (error) {
    console.error("❌ Failed test(s), see first occurring error below");
    throw error;
  }
}

main();
