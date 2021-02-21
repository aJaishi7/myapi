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

exports.removeMe = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({
            success: false,
            data: {}
        });
    }
    await user.remove();
    res.status(200).json({
        success: true,
        count: user.length,
        data: {}
    });
}

exports.updateMe = async (req, res) => {
    const me = await User.findById(req.params.id);
    const {fullName, username, email, password} = req.body;
    if (!me) {
        res.status(404).json({
            success: false,
            data: {}
        });
    }
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        success: true
    });
}











