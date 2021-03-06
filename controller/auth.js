const ErrorHandler = require('../utilities/ErrorHandler');
const User = require('../entity/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passwordController = require('../middleware/changePassword');


exports.register = async (req, res) => {
    const {fullName, username, phone, password} = req.body;

    //Password hasing in controller
    // const salt = bcrypt.genSaltSync(10);
    // req.body.password = bcrypt.hashSync(req.body.password, salt);

    User.findOne({username: username}).then(async (data) => {
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
    await User.find().then((users) => {

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

    })
}

exports.findDoctor = async (req, res) => {
    await User.find({usertype: 'Doctor'}).then((doctors) => {
        res.status(200).json({success: false, data: doctors, count: doctors.length});
    })
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
    const me = await User.findById({_id: req.params.id});
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


exports.changePassword = async (req, res) => {
    const {password, newPassword} = req.body;
    const id = req.params.id;

    await User.findOne({_id: id}).then((user) => {
        if (user) {
            if (!password || !newPassword) {
                res.status(400).json({message: 'Invalid Request !', success: false});
            } else {
                bcrypt.compare(password, user.password, (err, ok) => {
                    if (!ok) {
                        res.status(401).json({success: false});
                        console.log("zzzzzzzzzzzz");
                    } else {
                        bcrypt.hash(newPassword, 10).then((hash) => {
                            user.newPassword = hash;
                            User.updateOne({_id: id}, {password: user.newPassword}).then((success) => {
                                if (success) {
                                    res.status(200).json({success: true});
                                    console.log("fdsfdsfsd");
                                } else {
                                    res.status(401).json({success: false});
                                    console.log("err")
                                }
                            })
                        })
                    }
                })
            }
        } else {
            res.status(404).json({message: "No User Found", success: false});
        }

    })
}


exports.letMeLogin = async (req, res) => {
    const {username, password} = req.body;
    await User.findOne({username: username}).then((user) => {
        if (user === null) {
            return res.status(201).json({
                success: false,
                data: user,
                message: "Invalid Username! Please Enter Valid Username"
            });
        }
        bcrypt.compare(password, user.password, (err, ok) => {
            if (ok === false) {
                res.status(201).json({
                    success: false,
                    message: "Invalid Password! Please Enter Valid Password"
                });
            } else {
                //Generate WebToken
                try {
                    const token = jwt.sign({tokenId: user._id}, "pk");
                    return res.status(200).json({success: true, data: user, token: token});
                } catch (ex) {
                    new ErrorHandler("Error Generating Token" + ex.message);
                }
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














