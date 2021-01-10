const { Family } = require("./family");

const initailFamily = {
  Shan: { gender: "Male", wife: "Anga", mother: null },
  Anga: {
    gender: "Female",
    husband: "Shan",
    children: ["Chit", "Ish", "Vich", "Aras", "Satya"],
    mother: null,
  },
  chit: { gender: "Male", wife: "Amba", mother: "Anga" },
  amba: {
    gender: "Female",
    husband: "Chit",
    children: ["Dritha", "Tritha", "Vritha"],
    mother: null,
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
