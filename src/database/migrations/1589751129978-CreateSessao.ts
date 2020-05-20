import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSessao1589751129978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'inicio',
            type: 'timestamp',
          },
          {
            name: 'fim',
            type: 'timestamp',
          },
          {
            name: 'pautaId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('pk_voto_usuario', 'voto');
    await queryRunner.dropTable('sessao');
  }
}
