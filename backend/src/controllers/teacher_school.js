const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getSchoolTeachers = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "ts.teacher_id, " +
                "t.start_year, " +
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
            "SELECT DISTINCT " +
                "c.id AS child_id," +
                "c.name_code, " +
                "ts.school_id, " +
                "sh.id AS sheet_id " +
            "FROM teacher_school ts " +
            "INNER JOIN teacher t ON ts.teacher_id = t.id " +
            "INNER JOIN school s on ts.school_id = s.id " +
            "INNER JOIN teacher_children tc ON t.id = tc.teacher_id " +
            "INNER JOIN child c ON tc.child_id = c.id " +
            "INNER JOIN child_properties cp ON c.id = cp.child_id " +
            "INNER JOIN properties p ON p.id = cp.property_id " +
            "INNER JOIN property_group pg ON p.group = pg.id " +
            "INNER JOIN sheet sh ON sh.id = pg.sheet_id " +
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

exports.getTeacherSchools = async (req, res) => {
    try {
        const { fullName } = req.params;
        console.log(fullName);
        const results = await sequelize.query(
            "SELECT " +
                "t.id AS teacher_id, " +
                "ts.school_id, " +
                "s.name AS school_name " +
            "FROM teacher_school ts " +
            "INNER JOIN teacher t ON ts.teacher_id = t.id " +
            "INNER JOIN school s on ts.school_id = s.id " +
            "WHERE CONCAT(t.first_name, t.last_name) = ?",
            {
                replacements: [fullName],
                type: QueryTypes.SELECT
            }
        )
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}