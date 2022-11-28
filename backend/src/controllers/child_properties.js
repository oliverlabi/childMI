const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllChildProperties = async (req, res) => {
    try {
        const { sheetId } = req.params;
        console.log(sheetId);
        const results = await sequelize.query(
        "SELECT " +
            "c.name_code as child_name_code, " +
            "pg.name as property_group_name, " +
            "p.name as property_name, " +
            "cp.value as child_property_value " +
        "FROM child c " +
        "INNER JOIN child_properties cp on c.id = cp.child_id " +
        "INNER JOIN properties p on p.id = cp.property_id " +
        "INNER JOIN property_group pg on p.group = pg.id " +
        "INNER JOIN sheet s ON pg.sheet_id = s.id " +
        "WHERE s.id = ?;",
        {
            replacements: [sheetId],
            type: QueryTypes.SELECT
        })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getChildProperties = async (req, res) => {
    try {
        const { sheetId, childId } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "c.name_code as child_name_code, " +
                "pg.name as property_group_name, " +
                "p.name as property_name, " +
                "cp.value as child_property_value " +
            "FROM child c " +
            "INNER JOIN child_properties cp on c.id = cp.child_id " +
            "INNER JOIN properties p on p.id = cp.property_id " +
            "INNER JOIN property_group pg on p.group = pg.id " +
            "INNER JOIN sheet s ON s.id = pg.sheet_id " +
            "WHERE c.id = ? " +
            "AND s.id = ?;",
            {
                replacements: [sheetId, childId],
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}