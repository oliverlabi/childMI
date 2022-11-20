const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllSchools = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT " +
                "name " +
            "FROM school",
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getSchool = async (req, res) => {
    try {
        const { name } = req.body;
        const results = await sequelize.query(
            "SELECT " +
                "name " +
            "FROM school " +
            "WHERE name = " + name,
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}