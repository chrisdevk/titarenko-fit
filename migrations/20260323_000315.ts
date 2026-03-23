import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "club_progress_club_last_month" numeric;
  ALTER TABLE "users" ADD COLUMN "club_progress_club_last_day" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP COLUMN "club_progress_club_last_month";
  ALTER TABLE "users" DROP COLUMN "club_progress_club_last_day";`)
}
