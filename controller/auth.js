const ErrorHandler = require('../utilities/ErrorHandler');
const User = require('../entity/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const {fullName, username, phone, password} = req.body;

    //Password hasing in controller
    // const salt = bcrypt.genSaltSync(10);
    // req.body.password = bcrypt.hashSync(req.body.password, salt);

    User.findOne({username: username},).then(async (data) => {
        if (data) {
            res.status(401).json({message: "User with such username already exists", success: false});
        }
        const user = await User.create(req.body);
        if (!user) {
            res.status(401).json({
                success: false,
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });

    })

}

exports.findMe = async (req, res) => {
    const me = await User.findById({_id: req.user._id});
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
    const me = await User.findById({_id: req.user._id});
    const {fullName, username, email, password} = req.body;
    if (!me) {
        res.status(404).json({
            success: false,
            data: {}
        });
    }
    await User.findByIdAndUpdate(me, req.body);
    res.status(200).json({
        success: true
    });
}

exports.letMeLogin = async (req, res) => {
    const {username, password} = req.body;
    await User.findOne({username: username}).then((user) => {
        if (user === null) {
            res.status(201).json({success: false, data: {}, message: "Invalid Username! Please Enter Valid Username"});
        }
        bcrypt.compare(password, user.password, (err, ok) => {
            if (ok === false) {
                res.status(201).json({
                    success: false,
                    data: {},
                    message: "Invalid Username! Please Enter Valid Username"
                });
            }
            //Generate WebToken
            try {
                const token = jwt.sign({tokenId: user._id}, "pk");
                res.status(200).json({success: true, data: user, message: "Welcome", token: token});
            } catch (ex) {
                new ErrorHandler("Error Generating Token" + ex.message);
            }
        });
    });
}

exports.logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({success: true, message: 'User Logged Out'});
}












