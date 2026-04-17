import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "club_months_days" DROP COLUMN IF EXISTS "duration";
    ALTER TABLE "club_months_days" DROP COLUMN IF EXISTS "video_url";
    DROP TABLE IF EXISTS "club_months_days_locales" CASCADE;

    CREATE TABLE IF NOT EXISTS "club_months_days_lessons" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "duration" numeric,
      "video_url" varchar
    );

    CREATE TABLE IF NOT EXISTS "club_months_days_lessons_locales" (
      "lesson_name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "club_months_days_lessons"
        ADD CONSTRAINT "club_months_days_lessons_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months_days"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "club_months_days_lessons_locales"
        ADD CONSTRAINT "club_months_days_lessons_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months_days_lessons"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "club_months_days_lessons_order_idx"
      ON "club_months_days_lessons" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "club_months_days_lessons_parent_id_idx"
      ON "club_months_days_lessons" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "club_months_days_lessons_locales_locale_parent_id_unique"
      ON "club_months_days_lessons_locales" USING btree ("_locale", "_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "club_months_days_lessons_locales" CASCADE;
    DROP TABLE IF EXISTS "club_months_days_lessons" CASCADE;

    CREATE TABLE IF NOT EXISTS "club_months_days_locales" (
      "lesson_name" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "club_months_days_locales"
        ADD CONSTRAINT "club_months_days_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months_days"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "club_months_days_locales_locale_parent_id_unique"
      ON "club_months_days_locales" USING btree ("_locale", "_parent_id");

    ALTER TABLE "club_months_days" ADD COLUMN IF NOT EXISTS "duration" numeric;
    ALTER TABLE "club_months_days" ADD COLUMN IF NOT EXISTS "video_url" varchar;
  `)
}
