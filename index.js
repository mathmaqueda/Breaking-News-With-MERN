import express from 'express';
import connectDatabase from "./src/database/database.js";
import userRoute from "./src/routes/user.route.js";
const app = express();
const PORT = 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);

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