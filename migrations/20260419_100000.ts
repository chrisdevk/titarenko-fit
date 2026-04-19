import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "club_months" RENAME COLUMN "stripe_product_i_d" TO "stripe_product_i_D";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "club_months" RENAME COLUMN "stripe_product_i_D" TO "stripe_product_i_d";
  `)
}
