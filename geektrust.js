const { readFileSync } = require("fs");
const { processCommands } = require("./src/processArgs");

const main = function (testFile) {
  const fileContent = readFileSync(testFile, "utf-8");
  const commands = fileContent.split("\n");

  const result = processCommands(commands);
  console.log(result.join("\n"));
};

main(process.argv[2]);
