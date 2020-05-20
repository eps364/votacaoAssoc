import { Router } from 'express';
import assembleiaRouter from './assembleia.routes';
import pautaRouter from './pauta.routes';
import sessaoRouter from './sessao.routes';
import usuarioRouter from './usuario.routes';
import votoRouter from './voto.routes';

const routes = Router();

routes.use('/assembleia', assembleiaRouter);
routes.use('/pauta', pautaRouter);
routes.use('/sessao', sessaoRouter);
routes.use('/usuario', usuarioRouter);
routes.use('/voto', votoRouter);

routes.get('/', (request, response) =>
  response.json({ message: 'Rota Padrão OK' }),
);

export default routes;
