import { postModel } from "../models/post.models.js";
import { getDatabaseError } from "../database/database.error.js";

const read = async (req, res) => {
    try {
        const posts = await postModel.findAll();
        return res.json(posts);
    } catch (error) {
        const { code, message } = getDatabaseError(error.code);
        return res.status(code).json({ message });
    }
};

const create = async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;
    try {
        const post = await postModel.create(titulo, img, descripcion, likes);
        return res.json(post);
    } catch (error) {
        const { code, message } = getDatabaseError(error.code);
        return res.status(code).json({ message });
    }
};

const update = async (req, res) => {
    const { id } = req.params
    const { titulo, img, descripcion, likes } = req.body

    try {
        await postModel.modificarPost(id, titulo, img, descripcion, likes)
        res.send("Post modificado con éxito")
    } catch (error) {
        const { code, message } = error.message && error.code < 500
            ? error
            : getDatabaseError(error.code);
        res.status(code).send(message)
    }
};

const updateLike = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.darLike(id);
        return res.json(post);
    } catch (error) {
        const { code, message } = error.message && error.code < 500
            ? error
            : getDatabaseError(error.code);
        return res.status(code).json({ message });
    }
}

const remove = async (req, res) => {
    const { id } = req.params

    try {
        await postModel.eliminarPost(id)
        res.send("Post eliminado con éxito")
    } catch (error) {
        const { code, message } = error.message && error.code < 500
            ? error
            : getDatabaseError(error.code);
        res.status(code).json({ message });
    }
};

export const postController = {
    read,
    create,
    update,
    updateLike,
    remove,
}