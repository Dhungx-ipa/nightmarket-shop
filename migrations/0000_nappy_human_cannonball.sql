CREATE TABLE "inquiries" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_id" text NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_phone" text,
	"message" text,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer NOT NULL,
	"features" text[] NOT NULL,
	"icon_class" text NOT NULL,
	"icon_bg_gradient" text NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"is_combo" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'available' NOT NULL
);
