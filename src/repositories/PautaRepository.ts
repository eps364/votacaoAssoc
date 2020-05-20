import { EntityRepository, Repository } from 'typeorm';
import Pauta from '../models/PautaModel';

@EntityRepository(Pauta)
class PautaRepository extends Repository<Pauta> {}
export default PautaRepository;
