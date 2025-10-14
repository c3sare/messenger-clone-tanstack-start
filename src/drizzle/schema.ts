import { sql } from "drizzle-orm";
import { pgTable, primaryKey } from "drizzle-orm/pg-core";

export const user = pgTable("user", (t) => ({
	id: t.text().primaryKey(),
	name: t.text().notNull(),
	email: t.text().notNull().unique(),
	emailVerified: t.boolean().default(false).notNull(),
	image: t.text(),
	createdAt: t.timestamp({ mode: "date" }).notNull().default(sql`now()`),
	updatedAt: t
		.timestamp({ mode: "date" })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const account = pgTable("account", (t) => ({
	id: t.text().primaryKey(),
	accountId: t.text().notNull(),
	providerId: t.text().notNull(),
	userId: t
		.text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: t.text(),
	refreshToken: t.text(),
	idToken: t.text(),
	accessTokenExpiresAt: t.timestamp(),
	refreshTokenExpiresAt: t.timestamp(),
	scope: t.text(),
	password: t.text(),
	createdAt: t.timestamp().defaultNow().notNull(),
	updatedAt: t
		.timestamp()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const session = pgTable("session", (t) => ({
	id: t.text().primaryKey(),
	expiresAt: t.timestamp().notNull(),
	token: t.text().notNull().unique(),
	createdAt: t.timestamp().defaultNow().notNull(),
	updatedAt: t
		.timestamp()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: t.text(),
	userAgent: t.text(),
	userId: t
		.text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
}));

export const verification = pgTable("verification", (t) => ({
	id: t.text().primaryKey(),
	identifier: t.text().notNull(),
	value: t.text().notNull(),
	expiresAt: t.timestamp().notNull(),
	createdAt: t.timestamp().defaultNow().notNull(),
	updatedAt: t
		.timestamp()
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const conversationUser = pgTable(
	"conversation_user",
	(t) => ({
		conversationId: t
			.integer()
			.notNull()
			.references(() => conversation.id, { onDelete: "cascade" }),
		userId: t
			.text()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		joinedAt: t.timestamp({ mode: "date" }).notNull().defaultNow(),
	}),
	(t) => [primaryKey({ columns: [t.conversationId, t.userId] })],
);

export const conversation = pgTable("conversation", (t) => ({
	id: t.serial().notNull().primaryKey(),
	lastMessageAt: t.timestamp({ mode: "date" }),
	name: t.text(),
	isGroup: t.boolean(),
	ownerId: t.text().references(() => user.id, { onDelete: "cascade" }),
	createdAt: t.timestamp({ mode: "date" }).notNull().defaultNow(),
}));

export const message = pgTable("message", (t) => ({
	id: t.serial().notNull().primaryKey(),
	body: t.text(),
	image: t.text(),
	senderId: t
		.text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	conversationId: t
		.integer()
		.notNull()
		.references(() => conversation.id, { onDelete: "cascade" }),
	createdAt: t.timestamp({ mode: "date" }).notNull().defaultNow(),
}));

export const messageRead = pgTable(
	"message_read",
	(t) => ({
		messageId: t
			.integer()
			.notNull()
			.references(() => message.id, { onDelete: "cascade" }),
		userId: t
			.text()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	}),
	(t) => [primaryKey({ columns: [t.messageId, t.userId] })],
);
