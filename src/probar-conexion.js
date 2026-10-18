import "dotenv/config";
import { conectarDB } from "./config/db.js";
import mongoose from "mongoose";

await conectarDB();
await mongoose.disconnect();node src/probar-conexion.js