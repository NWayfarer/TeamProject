class group {
  constructor(id, name, numberOfStudents) {
    this.id = id;
    this.name = name;
    this.numberOfStudents = numberOfStudents;
  }

  copy(other) {
    other.id = this.id;
    other.name = this.name + "";
    other.numberOfStudents = this.numberOfStudents;
  }
}

group.map = (item) => {
  return new group(item.id, item.name, item.numberOfStudents);
};

group.mapArray = (response) => {
  let groups = [];
  response.forEach((rawGroup) => {
    groups.push(group.map(rawGroup));
  });
  return groups;
};

export default group;
