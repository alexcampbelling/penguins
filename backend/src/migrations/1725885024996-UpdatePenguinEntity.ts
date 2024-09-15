import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePenguinEntity1725885024996 implements MigrationInterface {
  name = "UpdatePenguinEntity1725885024996";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Make suburb nullable if it's not already
    await queryRunner.query(
      `ALTER TABLE "penguin" ALTER COLUMN "suburb" DROP NOT NULL`
    );

    // Add rarity column as nullable
    await queryRunner.query(
      `ALTER TABLE "penguin" ADD "rarity" character varying`
    );

    // Add street column as nullable
    await queryRunner.query(
      `ALTER TABLE "penguin" ADD "street" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert street column
    await queryRunner.query(`ALTER TABLE "penguin" DROP COLUMN "street"`);

    // Revert rarity column
    await queryRunner.query(`ALTER TABLE "penguin" DROP COLUMN "rarity"`);

    // Make suburb not nullable again if it was originally not nullable
    await queryRunner.query(
      `ALTER TABLE "penguin" ALTER COLUMN "suburb" SET NOT NULL`
    );
  }
}
