import dotenv from "dotenv";
import db from "../db/db.js";

dotenv.config();

process.env.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "test_access_token_secret";
process.env.REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "test_refresh_token_secret";

process.env.NODE_ENV = "test";

before(async () => {
  try {
    await db.migrate.rollback({}, true);
    await db.migrate.latest();
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
});

after(async () => {
  await db.destroy();
});
