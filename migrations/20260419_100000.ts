import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "club_months" ALTER COLUMN "stripe_product_i_d" TYPE varchar USING NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "club_months" ALTER COLUMN "stripe_product_i_d" TYPE integer USING NULL;
  `)
}
