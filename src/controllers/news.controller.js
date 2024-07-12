import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({ message: "Submit all fields for registration" });
        }

        await createService({
            title,
            text,
            banner,
            user: { _id: "6688c9c8834b10868ce80879" }
        })

        res.status(201).send({ message: "Post created successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findAll = async (req, res) => {
    const news = await findAllService();
    if (news.length === 0) {
        return res.status(404).send({ message: "There are no registered news" });
    }
    res.send(news);
}

export {
    create,
    findAll,
}