import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

const migrations = async (request, response) => {
  if (!["GET", "POST"] === request.method) return response.status(405).end();

  const dryRun = request.method === "GET";
  const dbClient = await database.getNewClient();

  const migrations = await migrationRunner({
    dbClient: dbClient,
    dryRun,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });
  const stateCode =
    migrations.length > 0 && request.method === "POST" ? 201 : 200;

  await dbClient.end();
  return response.status(stateCode).json(migrations);
};

export default migrations;
