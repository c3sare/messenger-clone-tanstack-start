import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { db } from "@/drizzle";
import { auth } from "@/lib/auth";

const getCurrentUser = createServerFn().handler(async () => {
	try {
		const session = await auth.api.getSession(getRequest());

		const userId = session?.user?.id;

		if (!userId) {
			return null;
		}

		const currentUser = await db.query.user.findFirst({
			where: {
				id: userId,
			},
		});

		if (!currentUser) return null;

		return currentUser;
	} catch (error) {
		console.error(error);
		return null;
	}
});

export default getCurrentUser;
