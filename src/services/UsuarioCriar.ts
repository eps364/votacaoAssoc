import { getCustomRepository } from 'typeorm';
import Usuario from '../models/UsuarioModel';
import UsuarioRepository from '../repositories/UsuarioRepository';

interface Request {
  nome: string;
  cpf: string;
}

class UsuarioCriar {
  public async execute({ nome, cpf }: Request): Promise<Usuario> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const usuario = usuarioRepository.create({ nome, cpf });

    await usuarioRepository.save(usuario);

    return usuario;
  }
}

export default UsuarioCriar;
