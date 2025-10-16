import * as v from "valibot";

export const settingSchema = v.object({
	name: v.pipe(v.string(), v.minLength(3), v.maxLength(30)),
	image: v.optional(v.nullable(v.pipe(v.string(), v.url()))),
});
