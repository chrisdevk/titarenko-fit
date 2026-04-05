import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders_items" ALTER COLUMN "product_id" DROP NOT NULL;
  ALTER TABLE "orders_items" ADD COLUMN "stripe_product_i_d" varchar;
  ALTER TABLE "club_months" ADD COLUMN "price_in_cents" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders_items" ALTER COLUMN "product_id" SET NOT NULL;
  ALTER TABLE "orders_items" DROP COLUMN "stripe_product_i_d";
  ALTER TABLE "club_months" DROP COLUMN "price_in_cents";`)
}
