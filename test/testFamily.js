const chai = require("chai");
const assert = chai.assert;
const { Family } = require("../src/family");

describe("#Family", () => {
  const initailFamily = {
    Shan: { gender: "Male", wife: "Anga" },
    Anga: {
      gender: "Female",
      husband: "Shan",
      children: ["Chit", "Ish", "Vich", "Aras", "Satya"],
    },
    Chit: { gender: "Male", mother: "Anga" },
  };
  const family = new Family(initailFamily);

  describe("doesPersonExits", () => {
    it("should give true when the person exits in the family", () => {
      assert.isTrue(family.doesPersonExits("Shan"));
    });

    it("should give false when the person exits in the family", () => {
      assert.isFalse(family.doesPersonExits("Unknown"));
    });
  });

  describe("getSpouce", () => {
    let expected;

    it("should give the husband name when asked for female's spouce", () => {
      expected = "Shan";
      assert.deepStrictEqual(family.getSpouce("Anga"), expected);
    });

    it("should give the wife name when asked for male's spouce", () => {
      expected = "Anga";
      assert.deepStrictEqual(family.getSpouce("Shan"), expected);
    });

    it("should give null when the person does not have any spoce", () => {
      assert.isUndefined(family.getSpouce("Chit"));
    });
  });
});
