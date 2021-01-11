const { Family } = require("./family");
const presetFamily = require("../presetFamily.json");

const performOperation = function (family, operation, ...args) {
  let result;

  switch (operation) {
    case "ADD_CHILD":
      result = family.addChild(...args);
      break;
    case "GET_RELATIONSHIP":
      result = family.getRelationship(...args);
      break;
  }

  return result;
};

const processCommands = function (commands) {
  const family = new Family(presetFamily);
  const output = [];

  commands.forEach((command) => {
    const [operation, ...args] = command.split(" ");
    const result = performOperation(family, operation, ...args);
    output.push(result);
  });

  return output;
};

module.exports = { processCommands, performOperation };
