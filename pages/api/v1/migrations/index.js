import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  return await migrationHandler(request, true, response);
}

async function postHandler(request, response) {
  return await migrationHandler(request, false, response);
}

async function migrationHandler(request, dryRun, response) {
  let dbClient;

  dbClient = await database.getNewClient();

  const migrations = await migration(dbClient, dryRun);
  const stateCode = migrations.length > 0 && !dryRun ? 201 : 200;

  await dbClient.end();

  return response.status(stateCode).json(migrations);
}

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
