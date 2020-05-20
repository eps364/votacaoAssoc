import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UsuarioRepository from '../repositories/UsuarioRepository';
import UsuarioCriar from '../services/UsuarioCriar';

const usuarioRouter = Router();

usuarioRouter.get('/', async (request, response) => {
  const usuarioRepository = getCustomRepository(UsuarioRepository);
  const usuarios = await usuarioRepository.find();
  return response.json(usuarios);
});

usuarioRouter.post('/', async (request, response) => {
  try {
    const { nome, cpf } = request.body;

    const criarUsuario = new UsuarioCriar();

    const usuario = await criarUsuario.execute({ nome, cpf });

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usuarioRouter;
