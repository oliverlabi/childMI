const router = require("express").Router()
const childPropertiesController = require("../controllers/child_properties")

router.get("/child/:sheetId/:childId", childPropertiesController.getChildProperties)
router.get("/child/:sheetId", childPropertiesController.getAllChildProperties)
router.get("/properties/:sheetId", childPropertiesController.getPropertiesBySheet)
router.get("/properties/", childPropertiesController.getAllProperties)

module.exports = router;