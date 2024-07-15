import News from '../models/News.js';

// export sem default manda desestruturado
export const createService = (body) => News.create(body);

export const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");
// com o sort, ele traz sempre pelo último id inserido. o -1 se refere a decrescente.
// com o skip, os dados são mostrados a partir do offset como base.
// com o limit, o limite de dados consultados é delimitado.
// com o populate, ele busca os dados da tabela referente.

export const countNews = () => News.countDocuments();

export const topNewsService = () => News.findOne().sort({_id: -1}).populate("user");

export const findByIdService = (id) => News.findById(id).populate("user");
// populate pois cada notícia tem usuário atrelado a ela.