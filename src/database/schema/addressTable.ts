import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const addressTable = pgTable("addresses", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	user_id: integer().notNull(),
	receiver_name: varchar().notNull(),
	phone: integer().notNull(),
	street: varchar().notNull(),
	city: varchar().notNull(),
	province: varchar().notNull(),
	postal_code: varchar().notNull(),
	created_at: timestamp().defaultNow().notNull(),
});
