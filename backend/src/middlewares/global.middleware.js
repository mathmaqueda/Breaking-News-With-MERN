import mongoose from 'mongoose';
import userService from '../services/user.service.js';
import {findByIdService} from '../services/news.service.js';

export const validId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID" });
    }

    next();
};

export const validUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    req.id = id;
    req.user = user;

    next();
};

export const validAuthenticatedUser = async (req, res, next) => {
    const id = req.params.id;

    const news = await findByIdService(id);
 
    if (String(news.user._id) !== req.userId) {
        return res.status(400).send({ message: "You're not the owner of the news." });
    }

    req.id = id;

    next();
};