class Family {
  constructor(initialFamily) {
    this.family = initialFamily;
  }

  doesPersonExist(name) {
    return this.family[name] !== undefined;
  }

  getSpouce(name) {
    const person = this.family[name];
    return person.gender === "Male" ? person.wife : person.husband;
  }

  addChild(motherName, newChild, gender) {
    if (!this.doesPersonExist(motherName)) {
      return "PERSON_NOT_FOUND";
    }

    const mother = this.family[motherName];

    if (mother.gender === "Male") {
      return "CHILD_ADDITION_FAILED";
    }

    mother.children.push(newChild);
    this.family[newChild] = { gender: "Male", mother: motherName };

    if (gender === "Female") {
      this.family[newChild] = {
        gender: "Female",
        children: [],
        mother: motherName,
      };
    }

    return "CHILD_ADDITION_SUCCEEDED";
  }

  getChildren(parentName) {
    const parent = this.family[parentName];
    const motherName = parent.gender === "Male" ? parent.wife : parentName;
    const children = motherName ? this.family[motherName].children : [];
    return children;
  }

  getRelationship(name, relation) {
    let relationship = [];

    switch (relation) {
      case "Son":
        const children = this.getChildren(name);
        relationship = children.filter(
          (child) => this.family[child].gender === "Male"
        );
        break;

      default:
        break;
    }

    return relationship;
  }
}

module.exports = { Family };
