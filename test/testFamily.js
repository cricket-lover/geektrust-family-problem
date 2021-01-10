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

  describe("getChildren", () => {
    let expected = [];

    it("should give the children of the parent when asked with a male parent", () => {
      expected = ["Vila", "Chika"];
      assert.deepStrictEqual(family.getChildren("Lika"), expected);
    });

    it("should give the children of the parent when asked with a male parent", () => {
      expected = ["Vila", "Chika"];
      assert.deepStrictEqual(family.getChildren("Vich"), expected);
    });

    it("should give empty array when there are no children to the given parent", () => {
      expected = [];
      assert.deepStrictEqual(family.getChildren("Ish"), expected);
    });
  });

  describe("getRelationship", () => {
    let expected;
    let actual;

    describe("Son", () => {
      it("should give son when the parent has only one son", () => {
        expected = "Yodhan";
        actual = family.getRelationship("Jaya", "Son");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give all sons when the parent has many sons", () => {
        expected = "Asva Vyas";
        actual = family.getRelationship("Vyan", "Son");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none when the parent has no sons", () => {
        expected = "NONE";
        actual = family.getRelationship("Ish", "Son");
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("Daughter", () => {
      it("should give daughter when the parent has only one daughter", () => {
        expected = "Satya";
        actual = family.getRelationship("Shan", "Daughter");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give all daughters when the parent has many daughters", () => {
        expected = "Vila Chika";
        actual = family.getRelationship("Lika", "Daughter");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none when parent has no daugther", () => {
        expected = "NONE";
        actual = family.getRelationship("Ish", "Daughter");
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("Siblings", () => {
      it("should give Siblings when the parent has only one Sibling", () => {
        expected = "Laki";
        actual = family.getRelationship("Lavnya", "Siblings");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give all Siblingss when the parent has many Siblingss", () => {
        expected = "Dritha Vritha";
        actual = family.getRelationship("Tritha", "Siblings");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none when the person has no siblings", () => {
        expected = "NONE";
        actual = family.getRelationship("Shan", "Siblings");
        assert.deepStrictEqual(actual, expected);
      });
    });
  });
});
