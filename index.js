const express = require("express");
const app = express();
const connectDatabase = require("./src/database/db");

const userRoute = require("./src/routes/user.route");
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