import News from '../models/News.js';

const createService = (body) => News.create(body);

const findAllService = () => News.find();

// export sem default manda desestruturado
export { createService, findAllService};