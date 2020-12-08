import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateApprovalsMigration1607455174484
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "approvals",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "userId",
            type: "uuid",
          },
          {
            name: "dialogId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "ApprovalsDialogUserId",
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "ApprovalsDialogDialogId",
            columnNames: ["dialogId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("approvals");
  }
}
