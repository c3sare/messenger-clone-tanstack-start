import { createEnv } from "@t3-oss/env-core";
import * as z from "zod/mini";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BETTER_AUTH_SECRET: z.string().check(z.minLength(1)),
		AUTH_GOOGLE_ID: z.string().check(z.minLength(1)),
		AUTH_GOOGLE_SECRET: z.string().check(z.minLength(1)),
		AUTH_GITHUB_ID: z.string().check(z.minLength(1)),
		AUTH_GITHUB_SECRET: z.string().check(z.minLength(1)),
		PUSHER_APP_ID: z.string().check(z.minLength(1)),
		PUSHER_APP_SECRET: z.string().check(z.minLength(1)),
	},

	/**
	 * The prefix that client-side variables must have. This is enforced both at
	 * a type-level and at runtime.
	 */
	clientPrefix: "VITE_",

	client: {
		VITE_PUSHER_APP_KEY: z.string().check(z.minLength(1)),
		VITE_PUSHER_APP_CLUSTER: z.string().check(z.minLength(1)),
		VITE_CLOUDINARY_CLOUD_NAME: z.string().check(z.minLength(1)),
		VITE_CLOUDINARY_UPLOAD_PRESET: z.string().check(z.minLength(1)),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: process.env,

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN=` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
});
