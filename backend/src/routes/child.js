const router = require("express").Router()
const childController = require("../controllers/child")

router.get("/properties/:id", childController.getChildData)
router.get("/properties", childController.getAllChildData)

module.exports = router;