const { Rotation } = require('../models/rotation')

exports.updateRotation = async (req, res) => {
    const { rotationNum, attempt } = req.body;
    try {
        const iSessionId = req.params.id
        const rotation = new Rotation();
        const updatedRotation = await rotation.updateRotation(iSessionId, rotationNum, attempt);
        res.status(200).json(updatedRotation.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}