import { EntityRepository, Repository } from 'typeorm';
import Assembleia from '../models/AssembleiaModel';

@EntityRepository(Assembleia)
class AssembleiaRepository extends Repository<Assembleia> {}
export default AssembleiaRepository;
