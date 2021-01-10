const { readFileSync } = require("fs");

const main = function (testFile) {
  const fileContent = readFileSync(testFile, "utf-8");
  const commands = fileContent.split("\n");

  commands.forEach((command) => {
    const [operation, ...args] = command.split(" ");
    console.log(operation, args);
  });
};

main(process.argv[2]);
