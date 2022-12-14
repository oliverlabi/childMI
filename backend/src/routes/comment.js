const router = require("express").Router()
const commentController = require("../controllers/comment")

router.get("/:id", commentController.getAllCommentsBySheetId)

module.exports = router;