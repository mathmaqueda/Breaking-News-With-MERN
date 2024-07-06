const mongoose = require('mongoose');

// instanciando schema de user
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    }
});

// armazena em variável
const User = mongoose.model("User", UserSchema);

// exporta
module.exports = User;