import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

async function migration(dbClient, dryRun) {
  return await migrationRunner({
    dbClient,
    dryRun,
    dir: resolve("infra", "migrations"),
    direction: "up",
    verbose: true,
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
