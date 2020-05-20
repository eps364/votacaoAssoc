import { getCustomRepository } from 'typeorm';
import axios from 'axios';
import { isBefore, isAfter } from 'date-fns';
import Voto from '../models/VotoModel';
import VotoRepository from '../repositories/VotoRepository';
import SessaoRepository from '../repositories/SessaoRepository';
import UsuarioRepository from '../repositories/UsuarioRepository';

interface Request {
  sessaoId: string;
  voto: boolean;
  usuarioId: string;
}

class Votar {
  public async execute({ sessaoId, voto, usuarioId }: Request): Promise<Voto> {
    const votoRepository = getCustomRepository(VotoRepository);

    // Validar Sessao
    const sessaoRepository = getCustomRepository(SessaoRepository);
    const sessao = await sessaoRepository.findOne({ id: sessaoId });
    if (!sessao) throw new Error('Sessão não encontrada!');

    // Validacao Tempo
    if (isBefore(new Date(), new Date(sessao.inicio)))
      throw new Error('Horario de votação não iniciou!');
    if (isAfter(new Date(), new Date(sessao.fim)))
      throw new Error('Horario de votação já encerrou!');

    // Regra Validar Usuario
    const usuarioRepository = getCustomRepository(UsuarioRepository);
    const usuario = await usuarioRepository.findOne({ id: usuarioId });
    if (!usuario) throw new Error('Usuario não encontrada!');

    const jaVotou = await votoRepository.find({
      where: [
        {
          sessaoId,
          usuarioId,
        },
      ],
    });

    if (jaVotou.length > 0) throw new Error('Usuario já votou nesta sessao!');

    // Verificar autorização de usuario na API externação
    // https://user-info.herokuapp.com/users/99999999900
    try {
      const { data } = await axios.get(
        `https://user-info.herokuapp.com/users/${usuario.cpf}`,
      );
      if (!(data.status === 'ABLE_TO_VOTE'))
        throw new Error(`API status: ${data.status}`);
    } catch (error) {
      throw new Error(`API status: ${error}`);
    }

    const votoConc = votoRepository.create({ sessaoId, voto, usuarioId });

    await votoRepository.save(votoConc);

    return votoConc;
  }
}
export default Votar;
