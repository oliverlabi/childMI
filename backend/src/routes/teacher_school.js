const router = require("express").Router()
const teacherSchoolController = require("../controllers/teacher_school")

router.get("/teacher/:id", teacherSchoolController.getSchoolTeachers)
router.get("/child/:id", teacherSchoolController.getSchoolChildren)

module.exports = router;