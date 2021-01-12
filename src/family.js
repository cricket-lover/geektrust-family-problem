class Family {
  constructor(presetFamily) {
    this.family = presetFamily;
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
    this.family[newChild] = { gender: gender, mother: motherName };

    if (gender === "Female") {
      this.family[newChild].children = [];
    }

    return "CHILD_ADDITION_SUCCEEDED";
  }

  getChildren(parentName, gender) {
    const parent = this.family[parentName];
    const motherName = parent.gender === "Male" ? parent.wife : parentName;
    let children = motherName ? this.family[motherName].children : [];
    children = children.filter((child) => this.family[child].gender === gender);
    return children;
  }

  getSiblings(name) {
    const motherName = this.family[name].mother;
    const mother = this.family[motherName] || { children: [] };
    const siblings = mother.children.filter((child) => child !== name);
    return siblings;
  }

  getParents(name) {
    const mother = this.family[name].mother;
    const father = mother ? this.family[mother].husband : mother;
    return { mother, father };
  }

  getSon(name) {
    return this.getChildren(name, "Male");
  }

  getDaughter(name) {
    return this.getChildren(name, "Female");
  }

  getPaternalRelation(name, gender) {
    const { father } = this.getParents(name);
    let paternalAunt = [];

    if (father) {
      paternalAunt = this.getSiblings(father).filter(
        (sibling) => this.family[sibling].gender === gender
      );
    }

    return paternalAunt;
  }

  getPaternalUncle(name) {
    return this.getPaternalRelation(name, "Male");
  }

  getPaternalAunt(name) {
    return this.getPaternalRelation(name, "Female");
  }

  getMaternalRelation(name, gender) {
    const { mother } = this.getParents(name);
    let maternalRelation = [];

    if (mother) {
      maternalRelation = this.getSiblings(mother).filter(
        (sibling) => this.family[sibling].gender === gender
      );
    }

    return maternalRelation;
  }

  getMaternalUncle(name) {
    return this.getMaternalRelation(name, "Male");
  }

  getMaternalAunt(name) {
    return this.getMaternalRelation(name, "Female");
  }

  getSiblingsOfSpouce(name, gender) {
    const spouce = this.getSpouce(name);
    let siblingsOfSpouce = [];

    if (spouce) {
      siblingsOfSpouce = this.getSiblings(spouce).filter(
        (sibling) => this.family[sibling].gender === gender
      );
    }

    return siblingsOfSpouce;
  }

  getSpoucesOfSiblings(name, spouce) {
    const siblings = this.getSiblings(name);
    const marriedSiblings = siblings.filter(
      (sibling) => this.family[sibling][spouce]
    );
    const spoucesOfSiblings = marriedSiblings.map(
      (sibling) => this.family[sibling][spouce]
    );

    return spoucesOfSiblings;
  }

  getSisterInLaw(name) {
    const sistersOfSpouce = this.getSiblingsOfSpouce(name, "Female");
    const wivesOfSiblings = this.getSpoucesOfSiblings(name, "wife");

    return [...sistersOfSpouce, ...wivesOfSiblings];
  }

  getBrotherInLaw(name) {
    const brothersOfSpouce = this.getSiblingsOfSpouce(name, "Male");
    const husbandsOfSiblings = this.getSpoucesOfSiblings(name, "husband");

    return [...brothersOfSpouce, ...husbandsOfSiblings];
  }

  getRelationship(name, relationship) {
    if (!this.doesPersonExist(name)) {
      return "PERSON_NOT_FOUND";
    }

    const relation = relationship.replace(/-/g, "");
    const requiredMethod = `get${relation}`;
    const relatives = this[requiredMethod](name);

    return relatives.length ? relatives.join(" ") : "NONE";
  }
}

module.exports = { Family };
