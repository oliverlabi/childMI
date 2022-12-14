const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllCommentsBySheetId = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "c.child_id, " +
                "comment " +
            "FROM comment c " +
            "INNER JOIN child ch ON c.child_id = ch.id " +
            "INNER JOIN child_properties cp ON ch.id = cp.child_id " +
            "INNER JOIN properties p ON cp.property_id = p.id " +
            "INNER JOIN property_group pg ON p.group = pg.id " +
            "INNER JOIN sheet s ON s.id = pg.sheet_id " +
            "WHERE s.id = ?;",
            {
                replacements: [id],
                type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}