import { countNews, createService, findAllService, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeNewsService, deleteLikeNewsService, addCommentService, deleteCommentService } from "../services/news.service.js";

export const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({ message: "Submit all fields for registration" });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })

        res.status(201).send({ message: "Post created successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findAll = async (req, res) => {
    try {
        // offset é o item que determina qual é o item atual de seleção (meio que saltos).
        // limit é o limite de seleções
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(offset, limit);
        const total = await countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
        
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }))
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(404).send({ message: "No registered posts" });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        });
    } catch (err) {
        res.send(500).send({ message: err.message });
    }
}

export const findById = async (req, res) => {
    try {
        const { newsId } = req.params;

        const news = await findByIdService(newsId);

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length === 0) {
            return res.status(404).send({ message: "There are no news with this title." });
        }

        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }))
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const byUser = async (req, res) => {
    try {
        const id = req.userId;
        const news = await byUserService(id);

        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }))
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.id;
        const { title, text, banner } = req.body;

        if (!title && !text && !banner) {
            res.status(400).send({ message: "Submit all fields for update" });
        }

        const news = await findByIdService(id);

        if (String(news.user._id) !== req.userId) {
            return res.status(400).send({ message: "You can't update this post." });
        }

        await updateService(id, title, text, banner);

        return res.send({ message: "Post successfully updated!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const erase = async (req, res) => {
    try {
        const id = req.id;

        await eraseService(id);

        return res.send({ message: "Post successfully deleted!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const newsLiked = await likeNewsService(id, userId);

        if (!newsLiked) {
            await deleteLikeNewsService(id, userId);
            return res.status(200).send({ message: "Disliked" });
        }

        res.send({ message: "Liked" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const {comment} = req.body;

        if (!comment) {
            return res.status(400).send({ message: "Write a message to comment" });
        }

        await addCommentService(id, comment, userId);

        res.send({ message: "Comment added successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id, idComment } = req.params;
        const userId = req.userId;

        const commentDeleted = await deleteCommentService(id, idComment, userId);

        const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment);

        if (commentFinder.userId !== userId) {
            return res.status(400).send({ message: "You can't delete this comment" });
        }

        res.send({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}