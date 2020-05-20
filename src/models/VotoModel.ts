import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Usuario from './UsuarioModel';
import Sessao from './SessaoModel';

@Entity('votos')
class Voto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  voto: boolean;

  @Column()
  usuarioId: string;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column()
  sessaoId: string;

  @ManyToOne(() => Sessao)
  @JoinColumn({ name: 'sessaoId' })
  sessao: Sessao;
}

export default Voto;
