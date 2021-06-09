const router = require("express").Router();
const group = require("../database").group;
const { errorHandler } = require("./helper");

router.get("/group", async (req, res) => {
  let result = await group.findAll({
    attributes: ["id", "name", "numberOfStudents"],
  });
  res.json(result);
});

router.delete("/group", async (req, res) => {
  errorHandler(req, res, async () => {
    let result = await group.destroy({ where: { id: req.body.id } });
    res.json(result);
  });
});

router.put("/group", (req, res) => {
  errorHandler(req, res, async () => {
    let result = await group.update(req.body, {
      where: {
        id: req.body.id,
      },
      fields: ["name", "numberOfStudents"],
    });
    res.json(result);
  });
});

router.post("/group", async (req, res) => {
  errorHandler(req, res, async () => {
    let result = await group.create(req.body, {
      fields: ["name", "numberOfStudents"],
    });
    res.json(result);
  });
});

module.exports = router;
