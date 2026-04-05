import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ALTER COLUMN "categories_id" DROP NOT NULL;
  ALTER TABLE "club_months" ADD COLUMN "product_id" integer;
  ALTER TABLE "club_months" ADD CONSTRAINT "club_months_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "club_months_product_idx" ON "club_months" USING btree ("product_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "club_months" DROP CONSTRAINT "club_months_product_id_products_id_fk";
  
  DROP INDEX "club_months_product_idx";
  ALTER TABLE "products" ALTER COLUMN "categories_id" SET NOT NULL;
  ALTER TABLE "club_months" DROP COLUMN "product_id";`)
}
