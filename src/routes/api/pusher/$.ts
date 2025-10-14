import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";

export const Route = createFileRoute("/api/pusher/$")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const session = await auth.api.getSession(request);

				const userId = session?.user?.id;

				if (!userId) {
					return new Response(null, { status: 401 });
				}

				const body = await request.text();

				const [socketId, channel] = body
					.split("&")
					.map((str) => str.split("=")[1]);

				const data = {
					user_id: userId,
				};

				const authResponse = pusherServer.authorizeChannel(
					socketId,
					channel,
					data,
				);

				return Response.json(authResponse);
			},
		},
	},
});
