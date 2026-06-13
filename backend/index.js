import express from "express";
import cors from "cors";
import { postModel } from "./models/post.models.js";

const app = express();
app.use(express.json());
app.use(cors());

// GET /todos
// Define una ruta GET en /todos, con un manejador asíncrono que recibe la petición (req) y la respuesta (res)
app.get("/posts", async (req, res) => {
  // Intenta ejecutar el siguiente bloque de código
  try {
    // Espera a que el modelo obtenga todos los registros de la tabla "todos"
    const posts = await postModel.findAll();
    // Devuelve los registros obtenidos como respuesta en formato JSON
    return res.json(posts);
  } catch (error) {
    // Si ocurre un error, lo muestra en la consola
    console.log(error);
    // Devuelve una respuesta con código 500 y un mensaje de error
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /posts
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  if (!titulo) {
    return res.status(400).json({ message: "titulo is required" });
  }
  const newPost = {
    titulo,
    img,
    descripcion,
    likes,
  };
  try {
    const post = await postModel.create(newPost);
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});