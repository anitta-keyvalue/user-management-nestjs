import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateToUserRoles1776330088392 implements MigrationInterface {
  name = 'MigrateToUserRoles1776330088392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP NOT NULL DEFAULT now(), "role_id" integer, "user_id" integer, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "refreshtoken" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "refreshtoken" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`
        INSERT INTO "user_roles" ("user_id", "role_id")
        SELECT "id", "role_id" FROM "users" 
        WHERE "role_id" IS NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "refreshtoken" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "refreshtoken" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "user_roles"`);
  }
}
