import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" ADD COLUMN "metadata_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "metadata_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "metadata_keywords" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" DROP COLUMN IF EXISTS "metadata_title";
  ALTER TABLE "blogs" DROP COLUMN IF EXISTS "metadata_description";
  ALTER TABLE "blogs" DROP COLUMN IF EXISTS "metadata_keywords";`)
}
