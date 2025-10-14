import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/env";
import { relations } from "./relations";

const client = neon(env.DATABASE_URL);

export const db = drizzle({ client, relations, casing: "snake_case" });
