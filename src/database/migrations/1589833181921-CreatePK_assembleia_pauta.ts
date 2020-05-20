import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreatePKAssembleiaPauta1589833181921
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'pautas',
      new TableForeignKey({
        name: 'fk_assembleia_pauta',
        columnNames: ['assembleiaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'assembleias',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('pautas', 'fk_assembleia_pauta');
  }
}
