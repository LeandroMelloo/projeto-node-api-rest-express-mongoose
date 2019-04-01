const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
    let user = this;

    // se não existir modificação no registro do user, next.
    if(!user.isModified('password')) return next();

    // modificação do registro do user, será utilizado bcrypt para encrypted do password.
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted;
        return next();
    });
});

module.exports = mongoose.model('User', UserSchema);