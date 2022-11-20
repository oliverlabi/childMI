const router = require("express").Router()
const childController = require("../controllers/child_properties")

router.get("/:id", childController.getChildProperties)
router.get("/", childController.getAllChildProperties)

module.exports = router;