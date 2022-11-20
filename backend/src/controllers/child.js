const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllChildren = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT " +
                "CONCAT(t.first_name, ' ', t.last_name) AS full_name, " +
                "c.name_code, " +
                "c.age, " +
                "c.gender, " +
                "c.special_need " +
            "FROM child c " +
            "INNER JOIN teacher_children tc ON c.id = tc.child_id " +
            "INNER JOIN teacher t ON t.id = tc.teacher_id",
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getChild = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "CONCAT(t.first_name, ' ', t.last_name) AS full_name, " +
                "c.name_code, " +
                "c.age, " +
                "c.gender, " +
                "c.special_need " +
            "FROM child c " +
            "INNER JOIN teacher_children tc ON c.id = tc.child_id " +
            "INNER JOIN teacher t ON t.id = tc.teacher_id " +
            "WHERE c.id = " + id,
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}