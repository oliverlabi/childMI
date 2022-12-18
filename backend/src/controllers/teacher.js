const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllTeachers = async (req, res) => {
    try {
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "t.id, " +
                "CONCAT(t.first_name, ' ', t.last_name) AS full_name, " +
                "s.year " +
            "FROM teacher t " +
            "INNER JOIN teacher_children tc ON t.id = tc.teacher_id " +
            "INNER JOIN sheet s ON s.id = tc.sheet_id",
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
            "SELECT DISTINCT " +
                "t.id, " +
                "CONCAT(t.first_name, ' ', t.last_name) AS full_name, " +
                "s.year " +
            "FROM teacher t " +
            "INNER JOIN teacher_children tc ON t.id = tc.teacher_id " +
            "INNER JOIN sheet s ON s.id = tc.sheet_id " +
            "WHERE s.year = ?",
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
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "t.id AS teacher_id, " +
                "CONCAT(t.first_name, ' ', t.last_name) AS full_name " +
            "FROM teacher t " +
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

exports.getTeacherDataWithChildren = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "c.name_code AS child_name, " +
                "c.id AS child_id, " +
                "s.id AS sheet_id, " +
                "s.year " +
            "FROM teacher t " +
            "INNER JOIN teacher_children tc ON t.id = tc.teacher_id " +
            "INNER JOIN child c ON c.id = tc.child_id " +
            "INNER JOIN child_properties cp ON c.id = cp.child_id " +
            "INNER JOIN properties p ON p.id = cp.property_id " +
            "INNER JOIN property_group pg ON pg.id = p.group " +
            "INNER JOIN sheet s ON s.id = pg.sheet_id " +
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

exports.getTeacherYears = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await sequelize.query(
            "SELECT DISTINCT " +
                "t.id, " +
                "CONCAT(t.first_name, t.last_name) AS full_name, " +
                "tc.year from teacher t " +
            "INNER JOIN teacher_children tc ON t.id = tc.teacher_id " +
            "INNER JOIN sheet s ON s.id = tc.sheet_id " +
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
