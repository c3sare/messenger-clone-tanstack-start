"use server";

import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { and, eq, inArray, isNull, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { conversation, conversationUser } from "@/drizzle/schema";
import { pusherServer } from "@/lib/pusher";
import { createUserSchema } from "@/validators/createUserSchema";
import getCurrentUser from "../getCurrentUser";

export const createConversation = createServerFn()
	.inputValidator(createUserSchema)
	.handler(async ({ data }) => {
		const currentUser = await getCurrentUser(getRequest());

		if (!currentUser) return false;

		if ("members" in data) {
			const { members, name } = data;

			const newConversation = (
				await db
					.insert(conversation)
					.values({
						name,
						isGroup: true,
						ownerId: currentUser.id,
					})
					.returning()
			).at(0);

			if (!newConversation) throw new Error("Failed to create conversation");

			const users = await db
				.insert(conversationUser)
				.values([
					...[...members, currentUser.id].map((userId) => ({
						userId,
						conversationId: newConversation.id,
					})),
				])
				.returning();

			pusherServer.trigger(
				users.map((user) => user.userId),
				"conversation:new",
				newConversation,
			);

			revalidatePath("/conversations", "layout");

			return newConversation;
		}

		const { userId } = data;

		const existingConveration = (
			await db
				.select({
					id: conversationUser.conversationId,
					isGroup: conversation.isGroup,
				})
				.from(conversationUser)
				.leftJoin(
					conversation,
					eq(conversation.id, conversationUser.conversationId),
				)
				.groupBy(conversationUser.conversationId, conversation.isGroup)
				.having(sql`count(${conversationUser.conversationId}) > 1`)
				.where(
					and(
						inArray(conversationUser.userId, [currentUser.id, userId]),
						or(eq(conversation.isGroup, false), isNull(conversation.isGroup)),
					),
				)
		).at(0);

		if (existingConveration) {
			return existingConveration;
		}

		const newConversation = (
			await db.insert(conversation).values({}).returning()
		).at(0);

		if (!newConversation) throw new Error("Failed to create conversation");

		const users = await db
			.insert(conversationUser)
			.values([
				{
					userId: currentUser.id,
					conversationId: newConversation.id,
				},
				{
					userId,
					conversationId: newConversation.id,
				},
			])
			.returning();

		const createdConversation = await db.query.conversation.findFirst({
			where: {
				id: newConversation.id,
			},
			with: {
				user: true,
			},
		});

		pusherServer.trigger(
			users.map((user) => user.userId),
			"conversation:new",
			createdConversation,
		);

		revalidatePath("/conversations", "layout");

		return { ...newConversation, users };
	});
