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

  getParents(name) {
    const mother = this.family[name].mother;
    const father = mother ? this.family[mother].husband : mother;
    return { mother, father };
  }

  getRelationship(name, relation) {
    if (!this.doesPersonExist(name)) {
      return "PERSON_NOT_FOUND";
    }

    let relationship = [];
    let children = this.getChildren(name);
    const { mother, father } = this.getParents(name);
    let spouce = this.getSpouce(name);
    const siblings = this.getSiblings(name);

    switch (relation) {
      case "Son":
        relationship = children.filter(
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

      case "Paternal-Uncle":
        if (father) {
          relationship = this.getSiblings(father).filter(
            (sibling) => this.family[sibling].gender === "Male"
          );
        }
        break;

      case "Paternal-Aunt":
        if (father) {
          relationship = this.getSiblings(father).filter(
            (sibling) => this.family[sibling].gender === "Female"
          );
        }
        break;

      case "Maternal-Uncle":
        if (mother) {
          relationship = this.getSiblings(mother).filter(
            (sibling) => this.family[sibling].gender === "Male"
          );
        }
        break;

      case "Maternal-Aunt":
        if (mother) {
          relationship = this.getSiblings(mother).filter(
            (sibling) => this.family[sibling].gender === "Female"
          );
        }
        break;

      case "Sister-In-Law":
        let sistersOfSpouce = [];

        if (spouce) {
          sistersOfSpouce = this.getSiblings(spouce).filter(
            (sibling) => this.family[sibling].gender === "Female"
          );
        }

        const marriedMaleSiblings = siblings.filter(
          (sibling) => this.family[sibling].wife !== undefined
        );
        const wivesOfSiblings = marriedMaleSiblings.map(
          (sibling) => this.family[sibling].wife
        );

        relationship = [...sistersOfSpouce, ...wivesOfSiblings];
        break;

      case "Brother-In-Law":
        let brothersOfSpouce = [];

        if (spouce) {
          brothersOfSpouce = this.getSiblings(spouce).filter(
            (sibling) => this.family[sibling].gender === "Male"
          );
        }

        const marriedFemaleSiblings = siblings.filter(
          (sibling) => this.family[sibling].husband !== undefined
        );
        const husbandsOfSiblings = marriedFemaleSiblings.map(
          (sibling) => this.family[sibling].husband
        );

        relationship = [...brothersOfSpouce, ...husbandsOfSiblings];
        break;
    }

    return relationship.length ? relationship.join(" ") : "NONE";
  }
}

module.exports = { Family };
