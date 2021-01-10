const { Family } = require("./family");

const initailFamily = {
  Shan: { gender: "Male", wife: "Anga" },
  Anga: {
    gender: "Female",
    husband: "Shan",
    children: ["Chit", "Ish", "Vich", "Aras", "Satya"],
  },
  chit: { gender: "Male", wife: "Amba", mother: "Anga" },
  amba: {
    gender: "Female",
    husband: "Chit",
    children: ["Dritha", "Tritha", "Vritha"],
  },
};

const processCommands = function (commands) {
  const family = new Family(initailFamily);
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
