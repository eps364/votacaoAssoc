import { EntityRepository, Repository } from 'typeorm';
import Voto from '../models/VotoModel';

@EntityRepository(Voto)
class VotacaoRepository extends Repository<Voto> {}
export default VotacaoRepository;
