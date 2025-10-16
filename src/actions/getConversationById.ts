import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";
import { db } from "@/drizzle";
import getCurrentUser from "./getCurrentUser";

const getConversationById = createServerFn()
	.inputValidator(v.pipe(v.number(), v.integer()))
	.handler(async ({ data: conversationId }) => {
		try {
			const currentUser = await getCurrentUser();

			if (!currentUser?.id) {
				return null;
			}

			const conversation = await db.query.conversation.findFirst({
				where: {
					id: conversationId,
				},
				with: {
					user: true,
					message: {
						orderBy: (message, { asc }) => asc(message.createdAt),
						with: {
							sender: true,
							seenBy: true,
						},
					},
				},
			});

			if (!conversation) {
				throw new Error("Conversation not found");
			}

			return conversation;
		} catch (error) {
			console.error(error);
			return null;
		}
	});

export default getConversationById;
