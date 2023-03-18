import { BaseEntity, DataSource, Repository } from 'typeorm';

import dbConfig from '../config/db.config';

export class TestHelper {
  private static instance: TestHelper;
  private datasource: DataSource;

  private constructor() {
    this.datasource = new DataSource({
      type: 'mariadb',
      ...dbConfig,
    });
  }

  public static getInstance(): TestHelper {
    if (!TestHelper.instance) {
      TestHelper.instance = new TestHelper();
    }

    return TestHelper.instance;
  }

  public get isInitialized(): boolean {
    return this.datasource.isInitialized;
  }

  public initialize() {
    if (!this.isInitialized) {
      return this.datasource.initialize();
    }

    return Promise.resolve();
  }

  public destroy() {
    return this.datasource.destroy();
  }

  public async cleanDatabase(): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();

    try {
      // DB Cleaning
      await queryRunner.connect();

      const tables = await queryRunner.query('SHOW TABLES;');

      const tableNames = tables
        .map((row: any) => {
          const key = Object.keys(row)[0];
          const tableName = row[key];

          return tableName;
        })
        .filter(
          (tableName: string) =>
            tableName !== null && tableName !== 'migrations',
        );

      await queryRunner.query('SET FOREIGN_KEY_CHECKS=0;');

      for (const tableName of tableNames) {
        await queryRunner.query(`TRUNCATE ${tableName};`);
      }

      await queryRunner.query('SET FOREIGN_KEY_CHECKS=1;');
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  public getRepository(klass: typeof BaseEntity): Repository<any> {
    return this.datasource.getRepository(klass);
  }

  public async saveEntity<EntityType extends BaseEntity>(entity: BaseEntity) {
    const repository = this.datasource.getRepository<EntityType>(typeof entity);
    const saved = await repository.save(entity as EntityType);

    return saved;
  }

  public async saveDataAsEntity<EntityType extends BaseEntity>(
    data: object,
    klass: typeof BaseEntity,
  ) {
    const repository = this.datasource.getRepository<EntityType>(klass);
    const entity = repository.create(data as EntityType);
    const saved: EntityType = await repository.save(entity);

    return saved;
  }
}
