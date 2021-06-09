class discipline {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  copy(other) {
    other.id = this.id;
    other.name = this.name + "";
    other.description = this.description;
  }
}

discipline.map = (item) => {
  return new discipline(item.id, item.name, item.description);
};

discipline.mapArray = (response) => {
  let disciplines = [];
  response.forEach((rawDiscipline) => {
    disciplines.push(discipline.map(rawDiscipline));
  });
  return disciplines;
};

export default discipline;
