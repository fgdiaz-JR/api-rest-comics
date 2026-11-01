import "dotenv/config";
import express from "express";
import { fileURLToPath } from "node:url";
import { conectarDB } from "./config/db.js";
import autoresRoutes from "./routes/autores.routes.js";
import comicsRoutes from "./routes/comics.routes.js";

const app = express();
const frontendPath = fileURLToPath(new URL("../../Frontend/", import.meta.url));

// Middleware: permite leer el cuerpo de las peticiones en formato JSON
app.use(express.json());
app.use(express.static(frontendPath));

// Rutas de la API
app.use("/api/autores", autoresRoutes);
app.use("/api/comics", comicsRoutes);

// Middleware para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;

// Primero conectamos a la base de datos y luego levantamos el servidor
conectarDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
