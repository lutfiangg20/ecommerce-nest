import {
	integer,
	pgEnum,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const paymentsTable = pgTable("payments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	order_id: integer().notNull(),
	payment_method: varchar({
		enum: ["bank transfer", "ewallet", "cod"],
	})
		.notNull()
		.default("bank transfer"),
	status: varchar().notNull(),
	transaction_id: integer().notNull(),
	paid_at: timestamp().defaultNow().notNull(),
});
