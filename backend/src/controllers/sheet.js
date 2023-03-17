const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllSheets = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "id, " +
                "year, " +
                "season, " +
                "type, " +
                "starting_years " +
            "FROM sheet",
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getAllSheetsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "id, " +
                "year, " +
                "season, " +
                "starting_years " +
            "FROM sheet " +
            "WHERE type = ?",
            {
                replacements: [type],
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getFirstSheetWithDifferentType = async (req, res) => {
    try {
        const { type } = req.params;

        const results = await sequelize.query(
            "SELECT DISTINCT " +
            "id, " +
            "year, " +
            "season, " +
            "starting_years " +
            "FROM sheet " +
            "WHERE type != ? " +
            "LIMIT 1",
            {
                replacements: [type],
                type: QueryTypes.SELECT
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}