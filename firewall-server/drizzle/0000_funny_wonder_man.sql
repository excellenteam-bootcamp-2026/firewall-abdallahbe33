CREATE TABLE "firewall_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(20) NOT NULL,
	"mode" varchar(20) NOT NULL,
	"value" varchar(255) NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
