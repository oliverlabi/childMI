const router = require("express").Router()
const sheetController = require("../controllers/sheet")

router.get("/", sheetController.getAllSheets)

module.exports = router;