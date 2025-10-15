import { createMiddleware, createStart } from "@tanstack/react-start";

const myGlobalMiddleware = createMiddleware().server(async ({ next }) => {
	console.log("middleware");
	return await next();
});

export const startInstance = createStart(() => ({
	requestMiddleware: [myGlobalMiddleware],
}));
