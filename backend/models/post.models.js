// Importa la conexión "pool" desde el archivo de configuración de la base de datos
import { pool } from "../database/connection.js";

// Define una función asíncrona que obtiene todos los registros
const findAll = async () => {
    // Ejecuta la consulta SQL y extrae la propiedad "rows" del resultado
    const { rows } = await pool.query("SELECT * FROM posts");
    // Devuelve las filas obtenidas
    return rows;
};

const create = async (titulo, img, descripcion, likes) => {
    const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING * ";
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query(query, values)
};

const modificarPost = async (id, titulo, img, descripcion, likes) => {
    const query = "UPDATE posts SET titulo = $2, img = $3, descripcion = $4, likes = $5 WHERE id = $1"
    const values = [id, titulo, img, descripcion, likes]
    const result = await pool.query(query, values)
    if (result.rowCount === 0) {
        throw { code: 404, message: "No se consiguió ningún maleta con este id" }
    }
}

// Incrementa en 1 el número de likes de un post puntual
const darLike = async (id) => {
    const query = "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *"
    const values = [id]
    const { rows, rowCount } = await pool.query(query, values)
    if (rowCount === 0) {
        throw { code: 404, message: "No se encontró el post con este id" }
    }
    return rows[0]
}

const eliminarPost = async (id) => {
    const query = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const result = await pool.query(query, values)
    if (result.rowCount === 0) {
        throw { code: 404, message: "No se encontró ningún post con este id" }
    }
}
// Exporta un objeto "todoModel" que contiene la función "findAll"
export const postModel = {
    findAll,
    create,
    modificarPost,
    eliminarPost,
    darLike
};