const child = require('../models').models.child;

exports.getAllChildren = async (req, res) => {
    try {
        const children = await child.findAll();
        return res.status(200).json({ children });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}