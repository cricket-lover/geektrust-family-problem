const { Family } = require("./family");
const presetFamily = require("../presetFamily");

const processCommands = function (commands) {
  const family = new Family(presetFamily);
  const result = [];

  commands.forEach((command) => {
    const [operation, ...args] = command.split(" ");
    let output;

    if (operation === "ADD_CHILD") {
      output = family.addChild(...args);
    }

    result.push(output);
  });

  return result;
};

module.exports = { processCommands };
