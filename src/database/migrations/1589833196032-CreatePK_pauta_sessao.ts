import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreatePKPautaSessao1589833196032
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'sessao',
      new TableForeignKey({
        name: 'fk_pauta_sessao',
        columnNames: ['pautaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pautas',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('sessao', 'fk_pauta_sessao');
  }
}
