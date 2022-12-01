const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllSheets = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT " +
            "id, " +
            "year, " +
            "season, " +
            "type " +
            "FROM sheet",
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}