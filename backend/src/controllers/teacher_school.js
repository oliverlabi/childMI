const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getSchoolTeachers = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "ts.teacher_id, " +
                "CONCAT(t.first_name, ' ' , t.last_name) as teacher_full_name, " +
                "ts.school_id, " +
                "s.name AS school_name " +
            "FROM teacher_school ts " +
            "INNER JOIN teacher t ON ts.teacher_id = t.id " +
            "INNER JOIN school s ON ts.school_id = s.id " +
            "WHERE s.id = ?;",
            {
                replacements: [id],
                type: QueryTypes.SELECT
            }
        )
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getSchoolChildren = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "c.id AS child_id," +
                "c.name_code, " +
                "ts.school_id " +
            "FROM teacher_school ts " +
            "INNER JOIN teacher t ON ts.teacher_id = t.id " +
            "INNER JOIN school s on ts.school_id = s.id " +
            "INNER JOIN teacher_children tc ON t.id = tc.teacher_id " +
            "INNER JOIN child c ON tc.child_id = c.id " +
            "WHERE s.id = ?;",
            {
                replacements: [id],
                type: QueryTypes.SELECT
            }
        )
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}