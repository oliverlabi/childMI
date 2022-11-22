const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllTeachers = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT " +
                "id, " +
                "CONCAT(first_name, ' ', last_name) AS full_name, " +
                "start_year " +
            "FROM teacher",
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "id, " +
                "CONCAT(first_name, ' ', last_name) AS full_name, " +
                "start_year " +
            "FROM teacher " +
            "WHERE id = ?;",
            {
                replacements: [id],
                type: QueryTypes.SELECT,
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getTeacherDataWithChildren = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
            "c.name_code AS child_name, " +
            "c.id AS child_id " +
            "FROM teacher t " +
            "INNER JOIN teacher_children tc " +
            "ON t.id = tc.teacher_id " +
            "INNER JOIN child c " +
            "ON c.id = tc.child_id " +
            "WHERE t.id = ?;",
            {
                replacements: [id],
                type: QueryTypes.SELECT,
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
