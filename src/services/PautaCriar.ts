import { getCustomRepository } from 'typeorm';
import Pauta from '../models/PautaModel';
import PautaRepository from '../repositories/PautaRepository';
import AssembleiaRepository from '../repositories/AssembleiaRepository';

interface Request {
  pauta: string;
  descricao: string;
  assembleiaId: string;
}

class AssembleiaCriar {
  public async execute({
    pauta,
    descricao,
    assembleiaId,
  }: Request): Promise<Pauta> {
    const pautaRepository = getCustomRepository(PautaRepository);
    const assembleiaRepository = getCustomRepository(AssembleiaRepository);

    const assembleia = await assembleiaRepository.findOne(assembleiaId);

    if (!assembleia) throw new Error('Assembleia não encontrada!');

    const pautaConc = pautaRepository.create({
      pauta,
      descricao,
      assembleiaId,
    });

    await pautaRepository.save(pautaConc);

    return pautaConc;
  }
}

export default AssembleiaCriar;
