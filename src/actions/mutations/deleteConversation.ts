"use server";

import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import * as v from "valibot";
import { db } from "@/drizzle";
import { conversation } from "@/drizzle/schema";
import { pusherServer } from "@/lib/pusher";
import getCurrentUser from "../getCurrentUser";

export const deleteConversation = createServerFn()
	.inputValidator(v.number())
	.handler(async ({ data: conversationId }) => {
		const currentUser = await getCurrentUser();

		const userId = currentUser?.id;

		if (!userId) throw new Error("User not found");

		const conversationdb = await db.query.conversation.findFirst({
			where: {
				id: conversationId,
			},
			with: {
				user: true,
			},
		});

		if (
			(conversationdb?.isGroup && conversationdb.ownerId === userId) ||
			(!conversationdb?.isGroup &&
				conversationdb?.user.some((user) => user.id === userId))
		) {
			const deletedConversation = await db
				.delete(conversation)
				.where(eq(conversation.id, conversationId))
				.returning();

			pusherServer.trigger(
				conversationdb.user.map((item) => item.id),
				"conversation:remove",
				deletedConversation.at(0),
			);

			throw redirect({ to: "/conversations" });
		} else {
			throw new Error("You don't have permission to delete this conversation");
		}
	});
