import { db } from "@/drizzle";
import getCurrentUser from "./getCurrentUser";

const getConversations = async (request: Request) => {
	const currentUser = await getCurrentUser(request);

	const userId = currentUser?.id;

	if (!userId) {
		return [];
	}

	try {
		const user = await db.query.user.findFirst({
			where: {
				id: userId,
			},
			with: {
				conversation: {
					with: {
						message: {
							limit: 1,
							orderBy: (message, { desc }) => desc(message.createdAt),
							with: {
								sender: true,
								seenBy: true,
							},
						},
						user: true,
					},
				},
			},
		});

		if (!user) throw new Error("User not found");

		return user.conversation;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export default getConversations;
