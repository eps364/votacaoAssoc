import { EntityRepository, Repository } from 'typeorm';
import Sessao from '../models/SessaoModel';

@EntityRepository(Sessao)
class SessaoRepository extends Repository<Sessao> {}
export default SessaoRepository;
