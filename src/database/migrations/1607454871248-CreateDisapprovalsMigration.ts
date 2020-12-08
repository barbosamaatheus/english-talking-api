import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDisapprovalsMigration1607454871248
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "disapprovals",
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
            name: "usersId",
            type: "uuid",
          },
          {
            name: "dialogsId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "ApprovalsDialogUserId",
            columnNames: ["usersId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "ApprovalsDialogDialogId",
            columnNames: ["dialogsId"],
            referencedColumnNames: ["id"],
            referencedTableName: "dialogs",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("disapprovals");
  }
}
