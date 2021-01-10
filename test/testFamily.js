const chai = require("chai");
const assert = chai.assert;
const { Family } = require("../src/family");
const presetFamily = require("../presetFamily");

describe("#Family", () => {
  const family = new Family(presetFamily);

  describe("doesPersonExist", () => {
    it("should give true when the person exist in the family", () => {
      assert.isTrue(family.doesPersonExist("Shan"));
    });

    it("should give false when the person exist in the family", () => {
      assert.isFalse(family.doesPersonExist("Unknown"));
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
      assert.isUndefined(family.getSpouce("Vasa"));
    });
  });

  describe("addChild", () => {
    let expected;

    it("should give child addition success message when the child added successfully", () => {
      expected = "CHILD_ADDITION_SUCCEEDED";
      assert.deepStrictEqual(
        family.addChild("Chitra", "Aria", "Female"),
        expected
      );
    });

    it("should give child addition failed message when the child addition failed", () => {
      expected = "CHILD_ADDITION_FAILED";
      assert.deepStrictEqual(
        family.addChild("Asva", "Vani", "Female"),
        expected
      );
    });

    it("should give person not found message when the person does not exist in ", () => {
      expected = "PERSON_NOT_FOUND";
      assert.deepStrictEqual(
        family.addChild("Pjali", "Srutak", "Male"),
        expected
      );
    });
  });
});
