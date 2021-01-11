const { Family } = require("./family");
const presetFamily = require("../presetFamily.json");

const performOperation = function (family, operation, ...args) {
  let output;

  switch (operation) {
    case "ADD_CHILD":
      output = family.addChild(...args);
      break;
    case "GET_RELATIONSHIP":
      output = family.getRelationship(...args);
      break;
  }

  return output;
};

const processCommands = function (commands) {
  const family = new Family(presetFamily);
  const result = [];

  commands.forEach((command) => {
    const [operation, ...args] = command.split(" ");
    const output = performOperation(family, operation, ...args);
    result.push(output);
  });

  return result;
};

module.exports = { processCommands, performOperation };
