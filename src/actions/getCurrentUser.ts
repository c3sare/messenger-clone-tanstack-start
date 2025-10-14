import { db } from "@/drizzle";
import { auth } from "@/lib/auth";

const getCurrentUser = async (request: Request) => {
	try {
		const session = await auth.api.getSession(request);

		const userId = session?.user?.id;

		if (!userId) {
			return null;
		}

		const currentUser = await db.query.user.findFirst({
			where: {
				id: userId,
			},
		});

		return currentUser;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default getCurrentUser;
