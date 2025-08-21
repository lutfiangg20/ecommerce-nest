import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const productsTable = pgTable("producs", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	category_id: integer().notNull(),
	price: integer().notNull(),
	stock: integer().default(0).notNull(),
	description: varchar({ length: 255 }).notNull(),
	created_at: timestamp().defaultNow().notNull(),
});
