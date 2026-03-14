import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_club_months_days_day_type" AS ENUM('workout', 'rest');
  CREATE TYPE "public"."enum_club_months_days_badge" AS ENUM('none', 'start', 'finish');
  CREATE TYPE "public"."enum_club_months_start_day_of_week" AS ENUM('0', '1', '2', '3', '4', '5', '6');
  CREATE TABLE "club_months_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day_number" numeric NOT NULL,
  	"day_type" "enum_club_months_days_day_type" DEFAULT 'rest' NOT NULL,
  	"duration" numeric,
  	"badge" "enum_club_months_days_badge" DEFAULT 'none'
  );
  
  CREATE TABLE "club_months_days_locales" (
  	"lesson_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "club_months_equipment" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "club_months_equipment_locales" (
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "club_months" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"month_number" numeric NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"start_day_of_week" "enum_club_months_start_day_of_week" DEFAULT '0' NOT NULL,
  	"total_days" numeric DEFAULT 31 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "club_months_locales" (
  	"title" varchar NOT NULL,
  	"notes" jsonb,
  	"how_to_increase_load" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "club_months_id" integer;
  ALTER TABLE "club_months_days" ADD CONSTRAINT "club_months_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "club_months_days_locales" ADD CONSTRAINT "club_months_days_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "club_months_equipment" ADD CONSTRAINT "club_months_equipment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "club_months_equipment_locales" ADD CONSTRAINT "club_months_equipment_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "club_months" ADD CONSTRAINT "club_months_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "club_months_locales" ADD CONSTRAINT "club_months_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."club_months"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "club_months_days_order_idx" ON "club_months_days" USING btree ("_order");
  CREATE INDEX "club_months_days_parent_id_idx" ON "club_months_days" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "club_months_days_locales_locale_parent_id_unique" ON "club_months_days_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "club_months_equipment_order_idx" ON "club_months_equipment" USING btree ("_order");
  CREATE INDEX "club_months_equipment_parent_id_idx" ON "club_months_equipment" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "club_months_equipment_locales_locale_parent_id_unique" ON "club_months_equipment_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "club_months_month_number_idx" ON "club_months" USING btree ("month_number");
  CREATE INDEX "club_months_cover_image_idx" ON "club_months" USING btree ("cover_image_id");
  CREATE INDEX "club_months_updated_at_idx" ON "club_months" USING btree ("updated_at");
  CREATE INDEX "club_months_created_at_idx" ON "club_months" USING btree ("created_at");
  CREATE UNIQUE INDEX "club_months_locales_locale_parent_id_unique" ON "club_months_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_club_months_fk" FOREIGN KEY ("club_months_id") REFERENCES "public"."club_months"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_club_months_id_idx" ON "payload_locked_documents_rels" USING btree ("club_months_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "club_months_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "club_months_days_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "club_months_equipment" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "club_months_equipment_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "club_months" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "club_months_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "club_months_days" CASCADE;
  DROP TABLE "club_months_days_locales" CASCADE;
  DROP TABLE "club_months_equipment" CASCADE;
  DROP TABLE "club_months_equipment_locales" CASCADE;
  DROP TABLE "club_months" CASCADE;
  DROP TABLE "club_months_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_club_months_fk";
  
  DROP INDEX "payload_locked_documents_rels_club_months_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "club_months_id";
  DROP TYPE "public"."enum_club_months_days_day_type";
  DROP TYPE "public"."enum_club_months_days_badge";
  DROP TYPE "public"."enum_club_months_start_day_of_week";`)
}
