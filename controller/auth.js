const ErrorHandler = require('../utilities/ErrorHandler');
const User = require('../entity/auth');

exports.register = async (req, res) => {
    const user = await User.create(req.body);
    if (!user) {
        return new ErrorHandler('User Not Registered', 400);
    }

    res.status(200).json({
        success: true,
        data: user
    });
}