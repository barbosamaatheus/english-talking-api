import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDialogMigration1607452112456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "dialogs",
        columns: [
          {
            name: "id",
            type: "uuid",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "speech",
            type: "text",
          },
          {
            name: "answer",
            type: "text",
          },
          {
            name: "status",
            type: "enum",
            enum: ["APPROVED", "ANALYZING"],
          },
          {
            name: "owner",
            type: "uuid",
          },
          {
            default: "now()",
            name: "createdAt",
            type: "timestamp",
          },
          {
            default: "now()",
            name: "updatedAt",
            type: "timestamp",
          },
        ],
        foreignKeys: [
          {
            name: "UserDialog",
            columnNames: ["owner"],
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
    await queryRunner.dropTable("dialogs");
  }
}
