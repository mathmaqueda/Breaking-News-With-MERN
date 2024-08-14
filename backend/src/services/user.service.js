import User from '../models/User.js';

// inline, sem chaves, não precisa de return
const createService = (body) => User.create(body);

const findByEmailService = (email) => User.findOne({email: email});

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    username,
    email,
    avatar,
    background
) => User.findOneAndUpdate({ _id: id }, { name, username, email, avatar, background })

const updatePasswordService = (id, newPassword) => User.findOneAndUpdate({ _id: id }, {password: newPassword}, {new: true});

const eraseService = (id) => User.findOneAndDelete({ _id: id});

export default {
    findByEmailService,
    createService,
    findAllService,
    findByIdService,
    updateService,
    updatePasswordService,
    eraseService,
};