const express = require("express");
const userRoute = require("./src/routes/user.route");
const app = express();

app.use("/soma", userRoute);

app.listen(3000);

// ROTA - Itens Principais:
    // Method HTTP - CRUD:
        // GET - Pega um info
        // POST - Cria um info
        // PUT - Atualiza TODA a info
        // PATCH - Altera PARTE da info
        // DELETE - Deleta um info

    // Name - Identificador da rota "/"
    // Function (Callback) - Executa algum comando na rota de "name" (req, res) => {}