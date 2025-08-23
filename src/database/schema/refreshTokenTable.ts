import { timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const refreshTokenTable = pgTable("refresh_token", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer("user_id").notNull(),
	token: varchar({ length: 500 }).notNull(),
	userAgent: varchar("user_agent", { length: 255 }).notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	created_at: timestamp("created_at").defaultNow().notNull(),
});
