const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]

    },

    email: {
        type: String,
        match: [
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Please Provide a valid Email"
        ],
        unique: true

    },
    password: {
        type: String,
        required: [true, "please type a password"],
        minLength: 6,
        select: false
    },
    token: String,
    isAdmin: {
        type: Boolean,
        default: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,


}, { timestamps: true })

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const sallt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, sallt);

    next();

});

UserSchema.methods.matchPassWord = async function(password) {
    return await bcrypt.compare(password, this.password);

}

const User = mongoose.model('User', UserSchema);


module.exports = User;