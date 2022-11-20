const router = require("express").Router()
const childController = require("../controllers/child")

router.get("/properties/:id", childController.getChildData)
router.get("/properties", childController.getAllChildRows)

module.exports = router;