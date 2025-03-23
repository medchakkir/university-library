ALTER TYPE "public"."role" ADD VALUE 'TEACHER';--> statement-breakpoint
ALTER TYPE "public"."role" ADD VALUE 'STUDENT';--> statement-breakpoint
DROP TABLE "category" CASCADE;--> statement-breakpoint
DROP TABLE "discipline" CASCADE;--> statement-breakpoint
DROP TABLE "level" CASCADE;--> statement-breakpoint
DROP TABLE "subject" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture" text;