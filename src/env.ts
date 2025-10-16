import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

export const env = createEnv({
	server: {
		DATABASE_URL: v.pipe(v.string(), v.url()),
		BETTER_AUTH_SECRET: v.pipe(v.string(), v.minLength(1)),
		AUTH_GOOGLE_ID: v.pipe(v.string(), v.minLength(1)),
		AUTH_GOOGLE_SECRET: v.pipe(v.string(), v.minLength(1)),
		AUTH_GITHUB_ID: v.pipe(v.string(), v.minLength(1)),
		AUTH_GITHUB_SECRET: v.pipe(v.string(), v.minLength(1)),
		PUSHER_APP_ID: v.pipe(v.string(), v.minLength(1)),
		PUSHER_APP_SECRET: v.pipe(v.string(), v.minLength(1)),
	},
	clientPrefix: "VITE_",
	client: {
		VITE_PUSHER_APP_KEY: v.pipe(v.string(), v.minLength(1)),
		VITE_PUSHER_APP_CLUSTER: v.pipe(v.string(), v.minLength(1)),
		VITE_CLOUDINARY_CLOUD_NAME: v.pipe(v.string(), v.minLength(1)),
		VITE_CLOUDINARY_UPLOAD_PRESET: v.pipe(v.string(), v.minLength(1)),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
