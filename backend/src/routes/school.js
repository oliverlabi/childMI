const router = require("express").Router()
const schoolController = require("../controllers/school")

router.get("/:id", schoolController.getSchool)
router.get("/", schoolController.getAllSchools)

module.exports = router;