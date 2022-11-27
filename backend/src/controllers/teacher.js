const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllTeachers = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT " +
                "id, " +
                "CONCAT(first_name, ' ', last_name) AS full_name, " +
                "start_year " +
            "FROM teacher",
            { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getAllTeachersByYear = async (req, res) => {
    try {
        const { year } = req.params;
        const results = await sequelize.query(
            "SELECT " +
            "id, " +
            "CONCAT(first_name, ' ', last_name) AS full_name, " +
            "start_year " +
            "FROM teacher " +
            "WHERE start_year = ?;",
            {
                replacements: [year],
                type: QueryTypes.SELECT,
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getTeacher = async (req, res) => {
    try {
        const { id, year } = req.params;
        const results = await sequelize.query(
            "SELECT " +
                "t.id AS teacher_id, " +
                "CONCAT(t.first_name, ' ', t.last_name) AS full_name, " +
                "t.start_year, " +
                "s.id AS school_id, " +
                "s.name AS school_name " +
            "FROM teacher t " +
            "INNER JOIN teacher_school ts ON t.id = ts.teacher_id " +
            "INNER JOIN school s ON s.id = ts.school_id " +
            "WHERE t.id = ? " +
            "AND t.start_year = ?;",
            {
                replacements: [id, year],
                type: QueryTypes.SELECT,
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getTeacherDataWithChildren = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT " +
            "c.name_code AS child_name, " +
            "c.id AS child_id " +
            "FROM teacher t " +
            "INNER JOIN teacher_children tc " +
            "ON t.id = tc.teacher_id " +
            "INNER JOIN child c " +
            "ON c.id = tc.child_id " +
            "WHERE t.id = ?;",
            {
                replacements: [id],
                type: QueryTypes.SELECT,
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getAllYears = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "start_year " +
            "FROM teacher;",
            {
                type: QueryTypes.SELECT,
            })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
