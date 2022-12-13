const router = require("express").Router()
const teacherSchoolController = require("../controllers/teacher_children");

router.get("/:id", teacherSchoolController.getAllChildrenTeachersAndSchools)
router.get("/years", teacherSchoolController.getAllTeacherYears)

module.exports = router;