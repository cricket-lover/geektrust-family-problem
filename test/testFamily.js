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

  describe("getParents", () => {
    it("should give both the parents when the parent are known", () => {
      expected = { mother: "Amba", father: "Chit" };
      actual = family.getParents("Vritha");
      assert.deepStrictEqual(actual, expected);
    });

    it("should give undefined when the person has no siblings", () => {
      expected = { mother: undefined, father: undefined };
      actual = family.getParents("Shan");
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("Siblings", () => {
    it("should give all Siblings when the parent has many Siblings", () => {
      expected = ["Dritha", "Vritha"];
      actual = family.getSiblings("Tritha");
      assert.deepStrictEqual(actual, expected);
    });

    it("should give none when the person has no siblings", () => {
      expected = [];
      actual = family.getSiblings("Shan");
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("getRelationship", () => {
    let expected;
    let actual;

    describe("Son", () => {
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
      it("should give all Siblings when the parent has many Siblings", () => {
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

    describe("Paternal-Uncle", () => {
      it("should give Paternal-Uncle if the person has paternal uncle", () => {
        expected = "Asva";
        actual = family.getRelationship("Kriya", "Paternal-Uncle");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none if the person has no paternal uncle", () => {
        expected = "NONE";
        actual = family.getRelationship("Jaya", "Paternal-Uncle");
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("Paternal-Aunt", () => {
      it("should give Paternal-Aunt if the person has paternal aunt", () => {
        expected = "Atya";
        actual = family.getRelationship("Kriya", "Paternal-Aunt");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none if the person has no paternal aunt", () => {
        expected = "NONE";
        actual = family.getRelationship("Jaya", "Paternal-Aunt");
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("Maternal-Uncle", () => {
      it("should give Maternal-Uncle if the person has Maternal uncle", () => {
        expected = "Ahit";
        actual = family.getRelationship("Laki", "Maternal-Uncle");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none if the person has no Maternal uncle", () => {
        expected = "NONE";
        actual = family.getRelationship("Vasa", "Maternal-Uncle");
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("Maternal-Aunt", () => {
      it("should give Maternal-Aunt if the person has Maternal aunt", () => {
        expected = "Tritha";
        actual = family.getRelationship("Yodhan", "Maternal-Aunt");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none if the person has no Maternal aunt", () => {
        expected = "NONE";
        actual = family.getRelationship("Vila", "Maternal-Aunt");
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("Sister-In-Law", () => {
      it("should give Sister-In-Law if the person has Sister in law", () => {
        expected = "Satya";
        actual = family.getRelationship("Lika", "Sister-In-Law");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give Sister-In-Law if the person has Sister in law", () => {
        expected = "Satvy";
        actual = family.getRelationship("Vyas", "Sister-In-Law");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give Sister-In-Law if the person has Sister in law", () => {
        expected = "Amba Lika Chitra";
        actual = family.getRelationship("Ish", "Sister-In-Law");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none if the person has no sister in law", () => {
        expected = "NONE";
        actual = family.getRelationship("Vila", "Sister-In-Law");
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("Brother-In-Law", () => {
      it("should give Brother-In-Law if the person has Brother in law", () => {
        expected = "Jaya";
        actual = family.getRelationship("Vritha", "Brother-In-Law");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give Brother-In-Law if the person has Brother in law", () => {
        expected = "Ahit";
        actual = family.getRelationship("Arit", "Brother-In-Law");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give Brother-In-Law if the person has Brother in law", () => {
        expected = "Chit Ish Vich Aras";
        actual = family.getRelationship("Vyan", "Brother-In-Law");
        assert.deepStrictEqual(actual, expected);
      });

      it("should give none if the person has no Brother in law", () => {
        expected = "NONE";
        actual = family.getRelationship("Vila", "Brother-In-Law");
        assert.deepStrictEqual(actual, expected);
      });
    });
  });
});
