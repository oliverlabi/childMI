const router = require("express").Router()
const sheetController = require("../controllers/sheet")

router.get("/", sheetController.getAllSheets)
router.get("/:type", sheetController.getAllSheetsByType)
router.get("/:type/first", sheetController.getFirstSheetWithDifferentType)

module.exports = router;