const chai = require("chai");
const assert = chai.assert;
const { processCommands } = require("../src/processArgs");

describe("#processArgs", () => {
  describe("processCommands", () => {
    it("should give back the respective outputs message for addChild commands", () => {
      const commands = [
        "ADD_CHILD Chitra Aria Male",
        "ADD_CHILD Unknown Aria Male",
        "ADD_CHILD Shan Aria Male",
      ];

      const expected = [
        "CHILD_ADDITION_SUCCEEDED",
        "PERSON_NOT_FOUND",
        "CHILD_ADDITION_FAILED",
      ];

      assert.deepStrictEqual(processCommands(commands), expected);
    });

    it("should give back the respective outputs message for getRelationship commands", () => {
      const commands = [
        "GET_RELATIONSHIP Krpi Son",
        "GET_RELATIONSHIP Unknown Mila",
        "GET_RELATIONSHIP Lika Daughter",
      ];

      const expected = ["Kriya", "PERSON_NOT_FOUND", "Vila Chika"];

      assert.deepStrictEqual(processCommands(commands), expected);
    });
  });
});
