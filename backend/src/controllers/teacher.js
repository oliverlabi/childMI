const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllTeachers = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT " +
            "CONCAT(first_name, ' ', last_name) AS full_name, " +
            "start_year " +
            "FROM teacher",
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getTeacher = async (req, res) => {
    try {
        const { name } = req.body;
        const results = await sequelize.query(
            "SELECT " +
            "CONCAT(first_name, ' ', last_name) AS full_name " +
            "start_year " +
            "FROM teacher " +
            "WHERE full_name = " + name,
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}