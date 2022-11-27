const router = require("express").Router()
const teacherController = require("../controllers/teacher")

router.get("/years", teacherController.getAllYears)
router.get("/:year/:id/children", teacherController.getTeacherDataWithChildren)
router.get("/:year/:id", teacherController.getTeacher)
router.get("/:year", teacherController.getAllTeachersByYear)
router.get("/", teacherController.getAllTeachers)

module.exports = router;