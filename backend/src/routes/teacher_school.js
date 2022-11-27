const router = require("express").Router()
const teacherSchoolController = require("../controllers/teacher_school")

router.get("/:id", teacherSchoolController.getSchoolTeachers)

module.exports = router;