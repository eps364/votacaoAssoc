import { getCustomRepository } from 'typeorm';
import Assembleia from '../models/AssembleiaModel';
import AssembleiaRepository from '../repositories/AssembleiaRepository';

interface Request {
  assembleia: string;
  descricao: string;
  data: Date;
}

class AssembleiaCriar {
  public async execute({
    assembleia,
    descricao,
    data,
  }: Request): Promise<Assembleia> {
    const assembleiaRepository = getCustomRepository(AssembleiaRepository);

    const assembleiaConc = assembleiaRepository.create({
      assembleia,
      descricao,
      data,
    });

    await assembleiaRepository.save(assembleiaConc);

    return assembleiaConc;
  }
}

export default AssembleiaCriar;
