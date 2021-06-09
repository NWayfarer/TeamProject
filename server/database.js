const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

class group extends Model {}
class discipline extends Model {}
class schedule extends Model {}

group.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, notEmpty: true },
    numberOfStudents: {
      type: DataTypes.NUMBER,
      validate: {
        isInt: true,
      },
    },
  },
  { sequelize }
);

discipline.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, notEmpty: true },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize }
);

schedule.init(
  {
    date: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize }
);

group.hasMany(schedule);
discipline.hasMany(schedule);

schedule.belongsTo(group);
schedule.belongsTo(discipline);

module.exports.Connect = async () => {
  await group.sync();
  await discipline.sync();
  await schedule.sync();
};

module.exports.group = group;
module.exports.discipline = discipline;
module.exports.schedule = schedule;
