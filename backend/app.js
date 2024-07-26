import express from 'express';
import connectDatabase from "./src/database/database.js";
import 'dotenv/config';
import cors from 'cors';
import router from './src/routes/index.js';

const app = express();


connectDatabase();
app.use(cors({
    origin: process.env.WEB_BASE_URL
}));
app.use(express.json());
app.use(router);

export default app;

// ROTA - Itens Principais:
    // Method HTTP - CRUD:
        // GET - Pega um info
        // POST - Cria um info
        // PUT - Atualiza TODA a info
        // PATCH - Altera PARTE da info
        // DELETE - Deleta um info

    // Name - Identificador da rota "/"
    // Function (Callback) - Executa algum comando na rota de "name" (req, res) => {}