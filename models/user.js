var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        index: {unique: true},
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid Email']
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

UserSchema.pre('save', function (next) {
    var user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // Override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', UserSchema);
