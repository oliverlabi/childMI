const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllChildren = async (req, res) => {
    try {
        const { sheetId } = req.params;

        const results = await sequelize.query(
            "SELECT " +
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
            "SELECT " +
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
            "AND c.id = ? " +
            "GROUP BY c.id, " +
                "c.name_code, " +
                "c.age, " +
                "c.gender, " +
                "c.special_need;",
            {
                replacements: [sheetId, childId],
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}