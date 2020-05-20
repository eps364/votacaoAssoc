import { getCustomRepository } from 'typeorm';
import Sessao from '../models/SessaoModel';
import SessaoRepository from '../repositories/SessaoRepository';
import PautaRepository from '../repositories/PautaRepository';

interface Request {
  inicio: Date;
  fim: Date;
  pautaId: string;
}

class SessaoCriar {
  public async execute({ inicio, fim, pautaId }: Request): Promise<Sessao> {
    const sessaoRepository = getCustomRepository(SessaoRepository);
    const pautaRepository = getCustomRepository(PautaRepository);

    const pauta = await pautaRepository.findOne(pautaId);

    if (!pauta) throw new Error('Pauta não encontrada!');

    const sessao = sessaoRepository.create({ inicio, fim, pautaId });

    await sessaoRepository.save(sessao);

    return sessao;
  }
}

export default SessaoCriar;
