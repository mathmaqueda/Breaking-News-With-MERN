import News from '../models/News.js';

// export sem default manda desestruturado
const createService = (body) => News.create(body);

const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
// com o sort, ele traz sempre pelo último id inserido. o -1 se refere a decrescente.
// com o skip, os dados são mostrados a partir do offset como base.
// com o limit, o limite de dados consultados é delimitado.
// com o populate, ele busca os dados da tabela referente.

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");
// populate pois cada notícia tem usuário atrelado a ela.

const searchByTitleService = (title) => News.find({
    // chaves para find específico.
    // cifrão para comando específico no MONGODB
    // comando $regex passa parâmetros da query string
    // $options especifica opções
    title: { $regex: `${title || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("user");

const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateService = (id, title, text, banner) =>
    News.findOneAndUpdate(
        { _id: id },
        { title, text, banner },
        { rowResult: true }
    );

const eraseService = (id) => News.findOneAndDelete({ _id: id });

const likeNewsService = (idNews, userId) =>
    News.findOneAndUpdate(
        { _id: idNews, "likes.userId": { $nin: [userId] } },
        { $push: { likes: { userId, createdAt: new Date() } } }
    );

const deleteLikeNewsService = (idNews, userId) =>
    News.findOneAndUpdate(
        { _id: idNews },
        { $pull: { likes: { userId } } }
    );

const addCommentService = (idNews, comment, userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);
    return News.findOneAndUpdate({ _id: idNews },
        {
            $push: {
                comments: { idComment, userId, comment, createdAt: new Date() }
            }
        }
    );
}

const deleteCommentService = (idNews, idComment, userId) =>
    News.findOneAndUpdate(
        { _id: idNews },
        { $pull: { comments: { idComment, userId } } }
    );

export {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deleteLikeNewsService,
    addCommentService,
    deleteCommentService
}