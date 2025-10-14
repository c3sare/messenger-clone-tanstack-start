"use server";

import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { conversation, message, messageRead } from "@/drizzle/schema";
import { pusherServer } from "@/lib/pusher";
import { createMessageSchema } from "@/validators/createMessageSchema";
import getCurrentUser from "../getCurrentUser";

export const createMessage = createServerFn()
	.inputValidator(createMessageSchema)
	.handler(async ({ data }) => {
		const { conversationId, image, body } = data;

		const currentUser = await getCurrentUser(getRequest());

		const userId = currentUser?.id;

		if (!userId) throw new Error("User not found");

		const newMessage = (
			await db
				.insert(message)
				.values({
					body,
					image,
					conversationId,
					senderId: userId,
				})
				.returning()
		).at(0);

		if (!newMessage) throw new Error("Message not created");

		await db.insert(messageRead).values({
			userId,
			messageId: newMessage.id,
		});

		await db
			.update(conversation)
			.set({
				lastMessageAt: new Date(),
			})
			.where(eq(conversation.id, conversationId));

		const updatedConversation = await db.query.conversation.findFirst({
			where: {
				id: conversationId,
			},
			with: {
				message: true,
				user: true,
			},
		});

		if (!updatedConversation) throw new Error("Conversation not found");

		const updateMessage = await db.query.message.findFirst({
			where: {
				id: newMessage.id,
			},
			with: {
				sender: true,
				seenBy: true,
			},
		});

		if (!updateMessage) throw new Error("Message not found");

		const { seenBy, ...updateMessageBody } = updateMessage;

		const transformedMessage = {
			...updateMessageBody,
			seen: seenBy,
		};

		await pusherServer.trigger(
			`conversation-${conversationId}`,
			"messages:new",
			transformedMessage,
		);

		const lastMessage = transformedMessage;

		updatedConversation.user.forEach((user) => {
			pusherServer.trigger(user.id, "conversation:update", {
				id: conversationId,
				messages: [lastMessage],
			});
		});

		return newMessage;
	});
