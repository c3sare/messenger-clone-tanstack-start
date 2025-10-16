import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";
import { db } from "@/drizzle";

const getMessages = createServerFn()
	.inputValidator(v.pipe(v.number(), v.integer()))
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
