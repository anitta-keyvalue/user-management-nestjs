import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1776139918323 implements MigrationInterface {
    name = 'Migrations1776139918323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshtoken" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshtoken"`);
    }

}
