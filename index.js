import express from 'express';
import connectDatabase from "./src/database/database.js";
import dotenv from 'dotenv';

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// ROTA - Itens Principais:
    // Method HTTP - CRUD:
        // GET - Pega um info
        // POST - Cria um info
        // PUT - Atualiza TODA a info
        // PATCH - Altera PARTE da info
        // DELETE - Deleta um info

    // Name - Identificador da rota "/"
    // Function (Callback) - Executa algum comando na rota de "name" (req, res) => {}