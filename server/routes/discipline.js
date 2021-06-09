const router = require("express").Router();
const discipline = require("../database").discipline;
const { errorHandler } = require("./helper");

router.get("/discipline", async (req, res) => {
  let result = await discipline.findAll({
    attributes: ["id", "name", "description"],
  });
  res.json(result);
});

router.delete("/discipline", async (req, res) => {
  errorHandler(req, res, async () => {
    let result = await discipline.destroy({ where: { id: req.body.id } });
    res.json(result);
  });
});

router.put("/discipline", (req, res) => {
  errorHandler(req, res, async () => {
    let result = await discipline.update(req.body, {
      where: {
        id: req.body.id,
      },
      fields: ["name", "description"],
    });
    res.json(result);
  });
});

router.post("/discipline", async (req, res) => {
  errorHandler(req, res, async () => {
    let result = await discipline.create(req.body, {
      fields: ["name", "description"],
    });
    res.json(result);
  });
});

module.exports = router;
