const assert = require("assert");
const { processCommands } = require("../src/processArgs");

describe("processCommands", () => {
  it("should give back the respective outputs message for child addition commands", () => {
    const commands = [
      "ADD_CHILD Anga Phani Male",
      "ADD_CHILD Padma Phani Male",
      "ADD_CHILD Shan Phani Male",
    ];

    const expected = [
      "CHILD_ADDITION_SUCCEEDED",
      "PERSON_NOT_FOUND",
      "CHILD_ADDITION_FAILED",
    ];

    assert.deepStrictEqual(expected, processCommands(commands));
  });
});
