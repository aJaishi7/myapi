const User = require('../entity/auth');
const bcryptjs = require('bcryptjs');
const ErrorResponse = require('../utilities/ErrorHandler');

exports.changePassword = (id, password, newPassword) => {
    new Promise((resolve, reject) => {
        User.find({_id: id})
            .then((user) => {
                let currentUser = user[0];
                const hashedPassword = currentUser.password;
                if (bcryptjs.compare(password, hashedPassword)) {
                    const salt = bcryptjs.genSalt(10);
                    const hash = bcryptjs.hash(newPassword, salt);
                    currentUser.password = hash;
                    return currentUser.save();
                } else {
                    new ErrorResponse({status: 401, message: "Invalid password"});
                }
            }).then(User => resolve({status: 200, message: 'Password Updated Sucessfully !'}))

            .catch(err => reject({status: 500, message: 'Internal Server Error !'}));
    })

}