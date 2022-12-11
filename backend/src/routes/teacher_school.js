const router = require("express").Router()
const teacherSchoolController = require("../controllers/teacher_school")

router.get("/teachers/:id", teacherSchoolController.getSchoolTeachers)
router.get("/schools/:fullName", teacherSchoolController.getTeacherSchools)
router.get("/children/:id", teacherSchoolController.getSchoolChildren)

module.exports = router;