import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Pauta from './PautaModel';
import Voto from './VotoModel';

@Entity('sessao')
class Sessao extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  inicio: Date;

  @Column()
  fim: Date;

  @Column()
  pautaId: string;

  @ManyToOne(() => Pauta, pauta => pauta.id)
  @JoinColumn({ name: 'pautaId' })
  pauta: Pauta;

  @OneToMany(() => Voto, voto => voto.sessao)
  votos: Voto[];
}

export default Sessao;
