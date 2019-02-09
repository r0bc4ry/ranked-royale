const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    epicGamesAccount: {
        type: {
            id: {
                type: String,
                required: true
            },
            displayName: {
                type: String,
                required: true
            }
        },
        required: false
    },
    stats: {
        solo: {
            rank: {
                type: Number,
                required: true,
                default: 1500
            },
            matchesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            kills: {
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
            rank: {
                type: Number,
                required: true,
                default: 1500
            },
            matchesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            kills: {
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
            rank: {
                type: Number,
                required: true,
                default: 1500
            },
            matchesPlayed: {
                type: Number,
                required: true,
                default: 0
            },
            kills: {
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
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
