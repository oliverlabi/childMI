const sequelize = require("../sequelize").sequelize
const { QueryTypes } = require("sequelize");

exports.getAllChildRows = async (req, res) => {
    try {
        const results = await sequelize.query(
        "SELECT sc.name, CONCAT(t.first_name, ' ' , t.last_name) as full_name, c.name_code, c.age, c.gender, c.special_need, pg.name, p.name, cp.value " +
        "FROM child c " +
        "INNER JOIN teacher_children tc ON c.id = tc.child_id " +
        "INNER JOIN teacher t ON t.id = tc.teacher_id " +
        "INNER JOIN teacher_school ts ON t.id = ts.teacher_id " +
        "INNER JOIN school sc on sc.id = ts.school_id " +
        "INNER JOIN child_properties cp on c.id = cp.child_id " +
        "INNER JOIN properties p on p.id = cp.property_id " +
        "INNER JOIN property_group pg on p.group = pg.id", { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getChildData = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const results = await sequelize.query(
            "SELECT sc.name, CONCAT(t.first_name, ' ' , t.last_name) as full_name, c.name_code, c.age, c.gender, c.special_need, pg.name, p.name, cp.value " +
            "FROM child c " +
            "INNER JOIN teacher_children tc ON c.id = tc.child_id " +
            "INNER JOIN teacher t ON t.id = tc.teacher_id " +
            "INNER JOIN teacher_school ts ON t.id = ts.teacher_id " +
            "INNER JOIN school sc on sc.id = ts.school_id " +
            "INNER JOIN child_properties cp on c.id = cp.child_id " +
            "INNER JOIN properties p on p.id = cp.property_id " +
            "INNER JOIN property_group pg on p.group = pg.id WHERE c.id =" + id, { type: QueryTypes.SELECT })
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}