import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/drizzle";
import { messageReads } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";

const handler = async ({
	request,
	params: { conversationId: convId },
}: {
	request: Request;
	params: { conversationId: string };
}) => {
	try {
		const currentUser = await auth.api.getSession(request);

		const conversationId = Number(convId);

		if (!currentUser?.user.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		const conversation = await db.query.conversations.findFirst({
			where: {
				id: conversationId,
			},
			with: {
				messages: {
					with: {
						seenBy: true,
					},
				},
				users: true,
			},
		});

		if (!conversation) {
			return new Response("Invalid ID", { status: 400 });
		}

		const lastMessage = conversation.messages.at(-1);

		if (!lastMessage) {
			return Response.json(conversation);
		}

		await db
			.insert(messageReads)
			.values({
				userId: currentUser.user.id,
				messageId: lastMessage.id,
			})
			.onConflictDoNothing();

		const message = await db.query.messages.findFirst({
			where: {
				id: lastMessage.id,
			},
			with: {
				sender: true,
				seenBy: true,
			},
		});

		if (!message) return new Response("Message not found", { status: 404 });

		const { seenBy, ...updateMessage } = message;

		const seenIds = seenBy.map((item) => item.id);

		await pusherServer.trigger(currentUser.user.id, "conversation:update", {
			id: conversationId,
			messages: [{ ...updateMessage, seenIds }],
		});

		if (seenIds.indexOf(currentUser.user.id) !== -1) {
			return Response.json(conversation);
		}

		await pusherServer.trigger(
			`conversation-${conversationId}`,
			"message:update",
			{
				...updateMessage,
				seenIds,
			},
		);

		return Response.json({ ...updateMessage, seenIds });
	} catch (error) {
		console.log(error, "ERROR_MESSAGES_SEEN");
		return new Response("Internal Error", { status: 500 });
	}
};

export const Route = createFileRoute(
	"/api/conversations/{$conversationId}/seen",
)({
	server: {
		handlers: {
			POST: handler,
		},
	},
});
