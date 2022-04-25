// Import dependencie

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import database config
import conectarDB from "./config/db.js";

//Import routes

import adminRoutes from "./routes/adminRoutes.js";
import postRoutes from "./routes/postRoutes.js"

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Config cors

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Permiss to consult the API
      callback(null, true);
    } else {
      // Doesn't have permiss
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

// Routing

app.use("/api/admin", adminRoutes);
app.use("/api/post", postRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
