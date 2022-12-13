const router = require("express").Router()
const teacherController = require("../controllers/teacher")


router.get("/:id/children", teacherController.getTeacherDataWithChildren)
router.get("/:id", teacherController.getTeacher)
router.get("/:id/years", teacherController.getTeacherYears)
router.get("/years/:year", teacherController.getAllTeachersByYear)
router.get("/", teacherController.getAllTeachers)

module.exports = router;