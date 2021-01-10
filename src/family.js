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
    this.family[newChild] = { gender: "Male", wife: null, mother: motherName };

    if (gender === "Female") {
      this.family[newChild] = {
        gender: "Female",
        husband: null,
        children: [],
        mother: motherName,
      };
    }

    return "CHILD_ADDITION_SUCCEEDED";
  }
}

module.exports = { Family };
