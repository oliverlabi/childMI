const router = require("express").Router()
const childPropertiesController = require("../controllers/child_properties")

router.get("/:sheetId/:childId", childPropertiesController.getChildProperties)
router.get("/:sheetId", childPropertiesController.getAllChildProperties)

module.exports = router;