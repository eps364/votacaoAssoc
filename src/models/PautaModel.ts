import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Assembleia from './AssembleiaModel';
import Sessao from './SessaoModel';

@Entity('pautas')
class Pauta extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pauta: string;

  @Column()
  descricao: string;

  @Column()
  assembleiaId: string;

  @ManyToOne(() => Assembleia)
  @JoinColumn({ name: 'assembleiaId' })
  assembleia: Assembleia[];

  @OneToMany(() => Sessao, sessao => sessao.id)
  @JoinColumn({ name: 'id' })
  sessao: Sessao[];
}

export default Pauta;
