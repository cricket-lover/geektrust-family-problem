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

  getSiblings(name) {
    const motherName = this.family[name].mother;
    const mother = this.family[motherName] || { children: [] };
    const siblings = mother.children.filter((child) => child !== name);
    return siblings;
  }

  getRelationship(name, relation) {
    if (!this.doesPersonExist(name)) {
      return "PERSON_NOT_FOUND";
    }

    let relationship = [];
    let children = this.getChildren(name);

    switch (relation) {
      case "Son":
        children = relationship = children.filter(
          (child) => this.family[child].gender === "Male"
        );
        break;

      case "Daughter":
        relationship = children.filter(
          (child) => this.family[child].gender === "Female"
        );
        break;

      case "Siblings":
        relationship = this.getSiblings(name);
        break;

      default:
        break;
    }

    return relationship.length ? relationship.join(" ") : "NONE";
  }
}

module.exports = { Family };
