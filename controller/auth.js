const ErrorHandler = require('../utilities/ErrorHandler');
const User = require('../entity/auth');

exports.register = async (req, res) => {
    const {fullName, username, email, password} = req.body;
    const user = await User.create(req.body);

    if (!user) {
        res.status(404).json({
            success: false,
            data: {}
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
}

