import News from '../models/News.js';

const createService = (body) => News.create(body);

const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");
// com o sort, ele traz sempre pelo último id inserido. o -1 se refere a decrescente.
// com o skip, os dados são mostrados a partir do offset como base.
// com o limit, o limite de dados consultados é delimitado.
// com o populate, ele busca os dados da tabela referente.

const countNews = () => News.countDocuments();

// export sem default manda desestruturado
export { createService, findAllService, countNews };