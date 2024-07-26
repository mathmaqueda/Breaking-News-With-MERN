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
    password,
    avatar,
    background
) => User.findOneAndUpdate({ _id: id }, { name, username, password, email, avatar, background })

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
};