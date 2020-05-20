import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AssembleiaCriar from '../services/AssembleiaCriar';
import AssembleiaRepository from '../repositories/AssembleiaRepository';

const assembleiaRouter = Router();

assembleiaRouter.get('/', async (request, response) => {
  const assembleiaRepository = getCustomRepository(AssembleiaRepository);
  const aseembleias = await assembleiaRepository.find();
  return response.json(aseembleias);
});

assembleiaRouter.post('/', async (request, response) => {
  try {
    const { assembleia, descricao, data } = request.body;

    const assembleiaCriar = new AssembleiaCriar();

    const assembleiaConcluido = await assembleiaCriar.execute({
      assembleia,
      descricao,
      data,
    });

    return response.json(assembleiaConcluido);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default assembleiaRouter;
