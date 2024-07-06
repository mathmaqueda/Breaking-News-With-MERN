const User = require('../models/User');

// inline, sem chaves, não precisa de return
const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => User.findOneAndUpdate({ _id: id }, { name, username, password, email, avatar, background })

module.exports = {
    createService,
    findAllService,
    findByIdService,
    updateService,
};