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

exports.findMe = async (req, res) => {
    const me = await User.findById(req.params.id);
    if (!me) {
        res.status(404).json({
            success: false,
            data: {}
        });
    }
    res.status(200).json({
        success: true,
        data: me
    })
}

exports.findUs = async (req, res) => {
    const users = await User.find();
    if (users.length <= 0) {
        res.status(404).json({
            success: false,
            data: {},
            count: users.length
        })
    }
    res.status(201).json({
        success: true,
        data: users,
        count: users.length
    });
}







