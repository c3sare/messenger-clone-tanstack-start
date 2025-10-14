import { db } from "@/drizzle";
import { auth } from "@/lib/auth";

const getUsers = async (request: Request) => {
	const session = await auth.api.getSession(request);

	const userId = session?.user?.id;

	if (!userId) {
		return [];
	}

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
};

export default getUsers;
