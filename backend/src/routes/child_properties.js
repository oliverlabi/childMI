const router = require("express").Router()
const childPropertiesController = require("../controllers/child_properties")

router.get("/:id", childPropertiesController.getChildProperties)
router.get("/", childPropertiesController.getAllChildProperties)

module.exports = router;