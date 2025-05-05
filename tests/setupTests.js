import dotenv from "dotenv";
import db from "../db/db.js";

dotenv.config();

// Ensure we have test-specific environment variables
process.env.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "test_access_token_secret";
process.env.REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "test_refresh_token_secret";

// Set test-specific environment variables
process.env.NODE_ENV = "test";

// Run migrations and clear tables before tests
before(async () => {
  try {
    // Drop all tables
    await db.migrate.rollback({}, true);
    // Run migrations
    await db.migrate.latest();
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
});

// Clean up after tests
after(async () => {
  await db.destroy();
});
