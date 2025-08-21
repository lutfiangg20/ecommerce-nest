import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const orderItemsTable = pgTable("order_items", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	order_id: integer().notNull(),
	product_id: integer().notNull(),
	quantity: integer().notNull(),
	price: integer().notNull(),
	created_at: timestamp().defaultNow().notNull(),
});
