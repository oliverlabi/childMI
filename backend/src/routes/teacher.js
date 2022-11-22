const router = require("express").Router()
const teacherController = require("../controllers/teacher")

router.get("/:id/children", teacherController.getTeacherDataWithChildren)
router.get("/:id", teacherController.getTeacher)
router.get("/", teacherController.getAllTeachers)

module.exports = router;