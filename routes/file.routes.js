const { v4: uuid } = require("uuid");
const { Router } = require("express");
const storage = require("../storage/mongo");
const authMiddleware = require("../middleware/auth.middleware")

const router = Router();

router.get("/", authMiddleware, async (req, res, next) => {
  const list = await (await storage.listAll()).filter((data) => +data.scores > 0);
  list.sort((a, b) => b.scores - a.scores)
  res.json(list.filter((item, id) => id <= 9));
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  const item = await storage.getById(req.params["id"]);
  console.log(req.query)
  res.status(item ? 200 : 404).json(
    item ? item : {
      statusCode: 404,
    }
  );
});

router.post("/", authMiddleware, async (req, res, next) => {
  console.log(req.query)
  const id = uuid();
  const { body } = req;
  const { idUser } = req.query
  body.id = id;
  body.idUser = idUser
  console.log(body)

  const newBody = await storage.create(body);
  console.log(newBody)


  res.json(newBody);
});

module.exports = router;
