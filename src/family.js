const MALE = "Male";
const FEMALE = "Female";
const WIFE = "wife";
const HUSBAND = "husband";
const NONE = "NONE";
const PERSON_NOT_FOUND_MESSAGE = "PERSON_NOT_FOUND";
const CHILD_ADDITION_FAILED_MESSAGE = "CHILD_ADDITION_FAILED";
const CHILD_ADDITION_SUCCEEDED_MESSAGE = "CHILD_ADDITION_SUCCEEDED";

class Family {
  constructor(presetFamily) {
    this.family = presetFamily;
  }

  doesPersonExist(name) {
    return this.family[name] !== undefined;
  }

  getSpouce(name) {
    const person = this.family[name];
    return person.gender === MALE ? person.wife : person.husband;
  }

  addChild(parentName, newChild, gender) {
    if (!this.doesPersonExist(parentName)) {
      return PERSON_NOT_FOUND_MESSAGE;
    }

    const mother = this.family[parentName];

    if (mother.gender === MALE) {
      return CHILD_ADDITION_FAILED_MESSAGE;
    }

    mother.children.push(newChild);
    this.family[newChild] = { gender: gender, mother: parentName };

    if (gender === FEMALE) {
      this.family[newChild].children = [];
    }

    return CHILD_ADDITION_SUCCEEDED_MESSAGE;
  }

  getChildren(parentName, gender) {
    const parent = this.family[parentName];
    const motherName = parent.gender === MALE ? parent.wife : parentName;
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
    return this.getChildren(name, MALE);
  }

  getDaughter(name) {
    return this.getChildren(name, FEMALE);
  }

  getPiblings(gender, parent) {
    let piblings = [];

    if (parent) {
      piblings = this.getSiblings(parent).filter(
        (sibling) => this.family[sibling].gender === gender
      );
    }

    return piblings;
  }

  getPaternalRelation(name, gender) {
    const { father } = this.getParents(name);
    return this.getPiblings(gender, father);
  }

  getPaternalUncle(name) {
    return this.getPaternalRelation(name, MALE);
  }

  getPaternalAunt(name) {
    return this.getPaternalRelation(name, FEMALE);
  }

  getMaternalRelation(name, gender) {
    const { mother } = this.getParents(name);
    return this.getPiblings(gender, mother);
  }

  getMaternalUncle(name) {
    return this.getMaternalRelation(name, MALE);
  }

  getMaternalAunt(name) {
    return this.getMaternalRelation(name, FEMALE);
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
      (sibling) => this.family[sibling][spouce] !== undefined
    );
    const spoucesOfSiblings = marriedSiblings.map(
      (sibling) => this.family[sibling][spouce]
    );

    return spoucesOfSiblings;
  }

  getSisterInLaw(name) {
    const sistersOfSpouce = this.getSiblingsOfSpouce(name, FEMALE);
    const wivesOfSiblings = this.getSpoucesOfSiblings(name, WIFE);

    return [...sistersOfSpouce, ...wivesOfSiblings];
  }

  getBrotherInLaw(name) {
    const brothersOfSpouce = this.getSiblingsOfSpouce(name, MALE);
    const husbandsOfSiblings = this.getSpoucesOfSiblings(name, HUSBAND);

    return [...brothersOfSpouce, ...husbandsOfSiblings];
  }

  getRelationship(name, relationship) {
    if (!this.doesPersonExist(name)) {
      return PERSON_NOT_FOUND_MESSAGE;
    }

    const relation = relationship.replace(/-/g, "");
    const requiredMethod = `get${relation}`;
    const relatives = this[requiredMethod](name);

    return relatives.length ? relatives.join(" ") : NONE;
  }
}

module.exports = { Family };
