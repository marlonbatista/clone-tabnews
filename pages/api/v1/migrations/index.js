import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

const migrations = async (request, response) => {
  const allowedMethod = ["GET", "POST"];
  if (!allowedMethod.includes(request.method))
    return response.status(405).end({
      error: `Method "${request.method}" not allowed`,
    });

  let dbClient;

  try {
    const dryRun = request.method === "GET";
    dbClient = await database.getNewClient();

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

    return response.status(stateCode).json(migrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
};

export default migrations;
