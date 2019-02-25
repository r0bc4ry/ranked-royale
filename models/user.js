const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    epicGamesAccount: {
        type: {
            displayName: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            jid: {
                type: String,
                required: true
            },
            inputType: {
                type: String,
                enum: ['MouseAndKeyboard', 'Controller', 'Touch'],
                required: true
            },
            region: {
                type: String,
                enum: ['na-east', 'na-west', 'europe', 'oceania', 'brazil', 'asia'],
                required: true
            }
        },
        required: false
    },
    stats: {
        solo: {
            rating: {
                type: Number,
                required: true,
                default: 1500
            },
            matchesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            minutesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            kills: {
                type: Number,
                required: true,
                default: 0
            },
            playersOutLived: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop25: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop10: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop1: {
                type: Number,
                required: true,
                default: 0
            },
            updatedAt: {
                type: Date,
                required: true,
                default: Date.now()
            }
        },
        duo: {
            rating: {
                type: Number,
                required: true,
                default: 1500
            },
            matchesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            minutesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            kills: {
                type: Number,
                required: true,
                default: 0
            },
            playersOutLived: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop25: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop5: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop12: {
                type: Number,
                required: true,
                default: 0
            },
            updatedAt: {
                type: Date,
                required: true,
                default: Date.now()
            }
        },
        squad: {
            rating: {
                type: Number,
                required: true,
                default: 1500
            },
            matchesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            minutesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            kills: {
                type: Number,
                required: true,
                default: 0
            },
            playersOutLived: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop6: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop3: {
                type: Number,
                required: true,
                default: 0
            },
            placeTop1: {
                type: Number,
                required: true,
                default: 0
            },
            updatedAt: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
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
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
