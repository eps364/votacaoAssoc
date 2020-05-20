import { EntityRepository, Repository } from 'typeorm';
import Usuario from '../models/UsuarioModel';

@EntityRepository(Usuario)
class UsuarioRepository extends Repository<Usuario> {
  public async findByCpf(cpf: string): Promise<Usuario | null> {
    const usuarioByCpf = await this.findOne({
      where: { cpf },
    });
    return usuarioByCpf || null;
  }
}
export default UsuarioRepository;
