import bcrypt from 'bcrypt';
import { generateToken } from '../services/auth.service.js';
import userService from '../services/user.service.js';

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            return res.status(400).send({ message: "Usuário está vazio!" });
        }

        const userExists = await userService.findByEmailService(email);

        if (userExists) {
            return res.status(400).send({ message: "Email already exists" });
        }

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ message: "Error creating User" });
        }

        res.status(201).send({
            message: "User created succesfully",
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();
        if (users.length === 0) {
            return res.status(400).send({ message: "There are no registered users" });
        }
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findById = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            return res.status(400).send({ message: "Submit at least one field for update" });
        }

        const id = req.id;

        await userService.updateService(
            id,
            name,
            username,
            email,
            avatar,
            background
        );

        res.status(200).send({ message: "User successfully updated" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const erase = async (req, res) => {
    try {
        const id = req.id;

        await userService.eraseService(id);

        res.status(200).send({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).send({ message: "Senha atual e nova senha são necessárias" });
        }

        const user = await userService.findByIdService(req.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Senha atual incorreta"});
        }

        const salt = await bcrypt.genSalt(10); // Gera um salt com 10 rounds
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userService.updatePasswordService(req.id, hashedPassword);

        return res.status(200).send({ message: "Senha alterada com sucesso" });
    } catch (err) {
        // Log o erro para depuração
        console.error("Erro ao atualizar a senha:", err);

        // Envie uma resposta de erro genérica
        return res.status(500).send({ message: "Erro interno do servidor" });
    } 
}

export default { create, findAll, findById, update, erase, updatePassword };