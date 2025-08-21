import {
	integer,
	pgEnum,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const ordersTable = pgTable("orders", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	user_id: integer().notNull(),
	status: varchar({
		enum: ["pending", "paid", "shipped", "completed", "cancelled"],
	})
		.notNull()
		.default("pending"),
	total_price: integer().notNull(),
	payment_id: integer().notNull(),
	shipping_address_id: integer().notNull(),
	created_at: timestamp().defaultNow().notNull(),
});
