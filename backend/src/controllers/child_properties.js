const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllChildProperties = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const results = await sequelize.query(
        "SELECT DISTINCT " +
            "c.id as child_id,   " +
            "pg.name as property_group_name, " +
            "p.id as property_id, " +
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
            "SELECT DISTINCT " +
                "pg.name as property_group_name, " +
                "p.id as property_id, " +
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

exports.getPropertiesBySheet = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "p.id, " +
                "p.name " +
            "FROM properties p " +
            "INNER JOIN property_group pg ON p.group = pg.id " +
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

exports.getAllProperties = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "p.id, " +
                "p.name " +
            "FROM properties p " +
            "INNER JOIN property_group pg ON p.group = pg.id " +
            "INNER JOIN sheet s ON pg.sheet_id = s.id;",
            {
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}