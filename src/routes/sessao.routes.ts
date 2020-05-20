import { Router } from 'express';
import { add } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import SessaoCriar from '../services/SessaoCriar';
import SessaoRepository from '../repositories/SessaoRepository';

const sessaoRouter = Router();

sessaoRouter.get('/', async (request, response) => {
  const sessaoRepository = getCustomRepository(SessaoRepository);
  const sessoes = await sessaoRepository.find();
  return response.json(sessoes);
});

sessaoRouter.post('/', async (request, response) => {
  try {
    const { inicio, pautaId, duracao } = request.body;

    const fim = add(new Date(inicio), { minutes: duracao || 1 });

    const criarSessao = new SessaoCriar();

    const sessao = await criarSessao.execute({ inicio, fim, pautaId });

    return response.json(sessao);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessaoRouter;
