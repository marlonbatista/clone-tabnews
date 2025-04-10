import database from "infra/database";
import orquestrator from "tests/orchestrator";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await cleanDataBase();
});

async function cleanDataBase() {
  await database.query("drop schema  public cascade; create schema public;");
}

async function getMigrationListCurrent() {
  const result = await database.query(`
    SELECT COUNT(*) AS total_migrations
    FROM public.pgmigrations;`);

  return result.rows[0].total_migrations;
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const schemaCurrent = await getMigrationListCurrent();

  expect(response1.status).toBe(201);

  const responseBody = await response1.json();

  expect(responseBody.length).toBeGreaterThan(0);
  expect(responseBody.length).toBe(schemaCurrent.length);

  expect(Array.isArray(responseBody)).toBe(true);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  // const schemaCurrent = await getMigrationListCurrent();
  // console.log("Schema current: " + schemaCurrent);

  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(response2Body.length).toBe(0);
  // expect(response2Body.length).toBe(schemaCurrent.length);

  expect(Array.isArray(response2Body)).toBe(true);
});
