const router = require("express").Router();
const group = require("../database").group;
const discipline = require("../database").discipline;
const schedule = require("../database").schedule;
const { errorHandler } = require("./helper");

router.get("/schedule", async (req, res) => {
  let result = await schedule.findAll({
    attributes: ["id", "date", "groupId", "disciplineId"],
    include: [
      {
        model: group,
        attributes: ["id", "name"],
      },
      {
        model: discipline,
        attributes: ["id", "name"],
      },
    ],
  });
  res.json(result);
});

router.delete("/schedule", async (req, res) => {
  errorHandler(req, res, async () => {
    let result = await schedule.destroy({ where: { id: req.body.id } });
    res.json(result);
  });
});

router.put("/schedule", (req, res) => {
  errorHandler(req, res, async () => {
    await schedule.update(req.body, {
      where: {
        id: req.body.id,
      },
      fields: ["groupId", "disciplineId", "date"],
    });

    let result = await schedule.findOne({
      attributes: ["id", "date", "groupId", "disciplineId"],
      where: { id: req.body.id },
      include: [
        {
          model: group,
          attributes: ["id", "name"],
        },
        {
          model: discipline,
          attributes: ["id", "name"],
        },
      ],
    });
    res.json(result);
  });
});

router.post("/schedule", async (req, res) => {
  errorHandler(req, res, async () => {
    let resultRaw = await schedule.create(req.body, {
      fields: ["groupId", "disciplineId", "date"],
    });

    let result = await schedule.findOne({
      attributes: ["id", "date", "groupId", "disciplineId"],
      where: { id: resultRaw.id },
      include: [
        {
          model: group,
          attributes: ["id", "name"],
        },
        {
          model: discipline,
          attributes: ["id", "name"],
        },
      ],
    });
    res.json(result);
  });
});

module.exports = router;
