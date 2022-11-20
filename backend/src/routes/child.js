const router = require("express").Router()
const childController = require("../controllers/child")

router.get("/:id", childController.getChild)
router.get("/", childController.getAllChildren)

module.exports = router;