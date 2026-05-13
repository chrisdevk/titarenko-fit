import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "club_months_days_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lesson_name" varchar,
  	"duration" numeric,
  	"video_url" varchar
  );
  
  DROP TABLE "club_months_days_locales" CASCADE;
  ALTER TABLE "club_months_days_lessons" ADD CONSTRAINT "club_months_days_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months_days"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "club_months_days_lessons_order_idx" ON "club_months_days_lessons" USING btree ("_order");
  CREATE INDEX "club_months_days_lessons_parent_id_idx" ON "club_months_days_lessons" USING btree ("_parent_id");
  ALTER TABLE "club_months_days" DROP COLUMN "duration";
  ALTER TABLE "club_months_days" DROP COLUMN "video_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "club_months_days_locales" (
  	"lesson_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP TABLE "club_months_days_lessons" CASCADE;
  ALTER TABLE "club_months_days" ADD COLUMN "duration" numeric;
  ALTER TABLE "club_months_days" ADD COLUMN "video_url" varchar;
  ALTER TABLE "club_months_days_locales" ADD CONSTRAINT "club_months_days_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months_days"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "club_months_days_locales_locale_parent_id_unique" ON "club_months_days_locales" USING btree ("_locale","_parent_id");`)
}
