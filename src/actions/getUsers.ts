import { createServerFn } from "@tanstack/react-start";
import { db } from "@/drizzle";
import getCurrentUser from "./getCurrentUser";

const getUsers = createServerFn().handler(async () => {
	const user = await getCurrentUser();

	if (!user) return [];

	const userId = user.id;

	try {
		const user = await db.query.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
			where: {
				NOT: {
					id: userId,
				},
			},
		});

		return user;
	} catch (error) {
		console.error(error);
		return [];
	}
});

export default getUsers;
