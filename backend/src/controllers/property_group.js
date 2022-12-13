const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllPropertiesByGroupsByChildId = async (req, res) => {
    try {
        const { childId } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "pg.id, " +
                "pg.name AS property_group_name, " +
                "p.name AS property_name, " +
                "cp.value AS property_value " +
            "FROM property_group pg " +
            "INNER JOIN properties p ON pg.id = p.group " +
            "INNER JOIN child_properties cp on p.id = cp.property_id " +
            "INNER JOIN child c ON c.id = cp.child_id " +
            "WHERE c.id = ?;",
            {
                replacements: [childId],
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}