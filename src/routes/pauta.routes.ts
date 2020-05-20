import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import PautaCriar from '../services/PautaCriar';
import PautaRepository from '../repositories/PautaRepository';

const pautaRouter = Router();

pautaRouter.get('/', async (request, response) => {
  const pautaRepository = getCustomRepository(PautaRepository);
  const pautas = await pautaRepository.find();
  return response.json(pautas);
});

pautaRouter.post('/', async (request, response) => {
  try {
    const { pauta, descricao, assembleiaId } = request.body;

    const criarPauta = new PautaCriar();

    const pautaConc = await criarPauta.execute({
      pauta,
      descricao,
      assembleiaId,
    });

    return response.json(pautaConc);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default pautaRouter;
