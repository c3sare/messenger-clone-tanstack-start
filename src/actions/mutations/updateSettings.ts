"use server";

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { user as userTable } from "@/drizzle/schema";
import { settingSchema } from "@/validators/settingSchema";
import getCurrentUser from "../getCurrentUser";

export const updateSettings = createServerFn()
	.inputValidator(settingSchema)
	.handler(async ({ data: { name, image } }) => {
		const user = await getCurrentUser();

		if (!user) throw new Error("User not found");

		const update = await db
			.update(userTable)
			.set({
				name,
				image,
			})
			.where(eq(userTable.id, user.id))
			.returning();

		if (!update.length) {
			return { success: false };
		}

		return { success: true };
	});
