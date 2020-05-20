import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ContabilizarVotosPorPauta from '../services/ContabilizarVotosPorPauta';
import VotarRepository from '../repositories/VotoRepository';
import Votar from '../services/Votar';

const votoRouter = Router();

votoRouter.get('/', async (request, response) => {
  const votarRepository = getCustomRepository(VotarRepository);
  const votos = await votarRepository.find();
  return response.json(votos);
});

votoRouter.get('/:pautaId', async (request, response) => {
  try {
    const { pautaId } = request.params;

    const contabilizar = new ContabilizarVotosPorPauta();

    const resultado = await contabilizar.execute({ pautaId });

    return response.json(resultado);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

votoRouter.post('/', async (request, response) => {
  try {
    const { sessaoId, voto, usuarioId } = request.body;

    const votar = new Votar();

    const votoConcluido = await votar.execute({ sessaoId, voto, usuarioId });

    return response.json(votoConcluido);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default votoRouter;
