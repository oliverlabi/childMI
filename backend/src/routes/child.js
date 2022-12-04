const router = require("express").Router()
const childController = require("../controllers/child")

router.get("/:sheetId/:childId", childController.getChild)
router.get("/:sheetId/", childController.getAllChildren)

module.exports = router;