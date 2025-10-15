import { createServerFn } from "@tanstack/react-start";
import * as z from "zod/mini";
import { db } from "@/drizzle";

const getMessages = createServerFn()
	.inputValidator(z.int())
	.handler(async ({ data: conversationId }) => {
		try {
			const messages = await db.query.message.findMany({
				where: {
					conversationId,
				},
				orderBy: {
					createdAt: "asc",
				},
				with: {
					sender: true,
					seenBy: true,
				},
			});

			return messages;
		} catch (error) {
			console.error(error);
			return null;
		}
	});

export default getMessages;
