import group from "./group";
import discipline from "./discipline";

class schedule {
  constructor(id, groupId, group, disciplineId, discipline, date) {
    this.id = id;
    this.groupId = groupId;
    this.group = group;
    this.disciplineId = disciplineId;
    this.discipline = discipline;
    this.date = date;
  }

  get normalDate() {
    return this.date;
  }

  copy(other) {
    other.id = this.id;
    other.groupId = this.groupId;
    let g = new group();
    this.group.copy(g);
    other.group = g;
    other.disciplineId = this.disciplineId;
    let d = new discipline();
    this.discipline.copy(d);
    other.discipline = d;
    other.date = this.date + "";
  }
}

schedule.map = (item) => {
  let groupObj = group.map(item.group);
  let disciplineObj = discipline.map(item.discipline);
  return new schedule(
    item.id,
    item.groupId,
    groupObj,
    item.disciplineId,
    disciplineObj,
    item.date
  );
};

schedule.mapArray = (response) => {
  let schedules = [];
  response.forEach((rawSchedule) => {
    schedules.push(schedule.map(rawSchedule));
  });
  return schedules;
};

export default schedule;
