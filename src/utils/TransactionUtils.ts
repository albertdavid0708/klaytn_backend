import { DataSource } from "typeorm";


export class ProviderTransaction {
  constructor(private readonly dataSource: DataSource) { }

  public async startTransaction() {
    await this.dataSource.query("START TRANSACTION");
  }

  public async rollback() {
    await this.dataSource.query("ROLLBACK");
  }

  public async commit() {
    await this.dataSource.query("COMMIT");
  }
}
