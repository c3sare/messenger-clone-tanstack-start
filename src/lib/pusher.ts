import PusherServer from "pusher";
import PusherClient from "pusher-js";
import { env } from "@/env";

export const pusherServer = new PusherServer({
	appId: env.PUSHER_APP_ID,
	key: env.VITE_PUSHER_APP_KEY,
	secret: env.PUSHER_APP_SECRET,
	cluster: env.VITE_PUSHER_APP_CLUSTER,
	useTLS: true,
});

export const pusherClient = new PusherClient(env.VITE_PUSHER_APP_KEY, {
	channelAuthorization: {
		endpoint: "/api/pusher",
		transport: "ajax",
	},
	cluster: env.VITE_PUSHER_APP_CLUSTER,
});
