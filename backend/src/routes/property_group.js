const router = require("express").Router()
const propertyGroupController = require("../controllers/property_group")

router.get("/:childId", propertyGroupController.getAllPropertiesByGroupsByChildId)

module.exports = router;

