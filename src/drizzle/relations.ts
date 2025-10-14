import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (t) => ({
	user: {
		conversation: t.many.conversation({
			from: t.user.id.through(t.conversationUser.userId),
			to: t.conversation.id.through(t.conversationUser.conversationId),
		}),
		message: t.many.message({
			from: t.user.id,
			to: t.message.senderId,
		}),
		seenMessage: t.many.messageRead({
			from: t.user.id,
			to: t.messageRead.userId,
		}),
	},
	conversation: {
		user: t.many.user({
			from: t.conversation.id.through(t.conversationUser.conversationId),
			to: t.user.id.through(t.conversationUser.userId),
		}),
		message: t.many.message({
			from: t.conversation.id,
			to: t.message.conversationId,
		}),
		owner: t.one.user({
			from: t.conversation.ownerId,
			to: t.user.id,
		}),
	},
	message: {
		seenBy: t.many.user({
			from: t.message.id.through(t.messageRead.messageId),
			to: t.user.id.through(t.messageRead.userId),
		}),
		sender: t.one.user({
			from: t.message.senderId,
			to: t.user.id,
		}),
	},
	messageReads: {},
}));
