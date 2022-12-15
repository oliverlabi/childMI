const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllChildren = async (req, res) => {
    try {
        const { sheetId } = req.params;

        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "c.id, " +
                "c.name_code, " +
                "c.age, " +
                "c.gender, " +
                "c.special_need " +
            "FROM child c " +
            "INNER JOIN child_properties cp ON cp.child_id = c.id " +
            "INNER JOIN properties p ON cp.property_id = p.id " +
            "INNER JOIN property_group pg ON pg.id = p.group " +
            "INNER JOIN sheet s ON s.id = pg.sheet_id " +
            "WHERE s.id = ? " +
            "GROUP BY c.id, " +
                "c.name_code, " +
                "c.age, " +
                "c.gender, " +
                "c.special_need;",
            {
                replacements: [sheetId],
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getChild = async (req, res) => {
    try {
        const { sheetId, childId } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "c.id AS child_id, " +
                "t.id AS teacher_id, " +
                "sc.id AS school_id, " +
                "CONCAT(t.first_name, ' ', t.last_name) AS teacher_full_name, " +
                "sc.name AS school_name, " +
                "c.name_code, " +
                "c.age, " +
                "c.gender, " +
                "c.special_need " +
            "FROM child c " +
            "INNER JOIN teacher_children tc ON tc.child_id = c.id " +
            "INNER JOIN teacher t ON t.id = tc.teacher_id " +
            "INNER JOIN teacher_school ts ON t.id = ts.teacher_id " +
            "INNER JOIN school sc ON sc.id = ts.school_id " +
            "INNER JOIN child_properties cp ON cp.child_id = c.id " +
            "INNER JOIN properties p ON cp.property_id = p.id " +
            "INNER JOIN property_group pg ON pg.id = p.group " +
            "INNER JOIN sheet s ON s.id = pg.sheet_id " +
            "WHERE s.id = ? AND c.id = ? ",
            {
                replacements: [sheetId, childId],
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}