import database from "infra/database.js";
import { InternalServerError } from "infra/erros";

const status = async (request, response) => {
  try {
    const updateAt = new Date().toISOString();

    const postgresVersion = await database.query("SHOW server_version;");
    const postgresVersionValue = postgresVersion.rows[0].server_version;

    const maxConnections = await database.query("SHOW max_connections;");
    const maxConnectionsValue = maxConnections.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const connectionsActive = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });

    const connectionActiveValue = connectionsActive.rows[0].count;

    response.status(200).json({
      update_at: updateAt,
      dependencies: {
        database: {
          version: postgresVersionValue,
          max_connections: parseInt(maxConnectionsValue),
          opened_connections: connectionActiveValue,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\n Error dentro do catch do controller:");
    console.error(publicErrorObject);
    response.status(500).json(publicErrorObject);
  }
};

export default status;
