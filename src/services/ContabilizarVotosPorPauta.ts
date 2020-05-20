import { getCustomRepository } from 'typeorm';
import SessaoRepository from '../repositories/SessaoRepository';
import VotoRepository from '../repositories/VotoRepository';
import Pauta from '../models/Pauta';

interface Request {
  pautaId: string;
}

class ContabilizarVotosPorPauta {
  public async execute({ pautaId }: Request): Promise<Sessao> {
    const sessaoRepository = getCustomRepository(SessaoRepository);
    const sessao = await sessaoRepository.findOne({
      where: { pautaId },
    });
    if (!sessao) throw new Error('Votação nesta Pauta não encontrada!');

    const votoRepository = getCustomRepository(VotoRepository);
    const votos = await votoRepository.find({
      where: { sessaoId: sessao.id },
    });

    const Sim = await votoRepository.count({
      where: {
        sessaoId: sessao.id,
        voto: true,
      },
    });
    const Nao = await votoRepository.count({
      where: {
        sessaoId: sessao.id,
        voto: false,
      },
    });

    return { pauta: sessao.pautaId, sessao: sessao.id, Sim, Nao };
  }
}

export default ContabilizarVotosPorPauta;
