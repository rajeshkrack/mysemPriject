// postgresql://cleanmycity_owner:A8wKjT4JVWli@ep-spring-dew-a55pim6a.us-east-2.aws.neon.tech/cleanmycity?sslmode=require

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {schema});