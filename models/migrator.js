import migrationRunner from "node-pg-migrate";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import database from "infra/database.js";

async function migration(dbClient, dryRun) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const migrationsDir = resolve(__dirname, "..", "infra", "migrations");

  try {
    await fs.access(migrationsDir);
  } catch (err) {
    // If migrations directory is missing, don't throw a 500 — return empty list
    if (err && err.code === "ENOENT") {
      return [];
    }
    throw err;
  }

  return await migrationRunner({
    dbClient,
    dryRun,
    dir: migrationsDir,
    direction: "up",
    log: () => {},
    migrationsTable: "pgmigrations",
  });
}

async function listPendingMigrations(dryRun) {
  let dbClient;

  dbClient = await database.getNewClient();

  const pendingMigrations = await migration(dbClient, dryRun);

  await dbClient.end();

  return pendingMigrations;
}

const migrator = {
  listPendingMigrations,
};
export default migrator;
