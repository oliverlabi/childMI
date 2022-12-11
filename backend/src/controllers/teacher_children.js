const {sequelize} = require("../sequelize");
const {QueryTypes} = require("sequelize");

exports.getAllChildrenTeachersAndSchools = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "c.id AS child_id, " +
                "t.id AS teacher_id, " +
                "CONCAT(t.first_name, ' ', t.last_name) AS teacher_full_name, " +
                "c.name_code AS child_name_code, " +
                "ts.school_id, " +
                "s.name AS school_name " +
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