// Importa la conexión "pool" desde el archivo de configuración de la base de datos
import { pool } from "../database/connection.js";

// Define una función asíncrona que obtiene todos los registros
const findAll = async () => {
    // Ejecuta la consulta SQL y extrae la propiedad "rows" del resultado
    const { rows } = await pool.query("SELECT * FROM posts");
    // Devuelve las filas obtenidas
    return rows;
};

const create = async (post) => {
    const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING * ";
    const { rows } = await pool.query(query, [post.titulo, post.img, post.descripcion, post.likes]);
    return rows[0];
};

// Exporta un objeto "todoModel" que contiene la función "findAll"
export const postModel = {
    findAll,
    create,
};