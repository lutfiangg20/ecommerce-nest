import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const productsTable = pgTable("producs", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	category_id: integer().notNull(),
});
