import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response1.status).toBe(201);

        const responseBody = await response1.json();

        expect(responseBody.length).toBeGreaterThan(0);

        expect(Array.isArray(responseBody)).toBe(true);
      });

      test("For the second time", async () => {
        const response2 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response2.status).toBe(200);

        const response2Body = await response2.json();

        expect(response2Body.length).toBe(0);
        expect(Array.isArray(response2Body)).toBe(true);
      });
    });
  });
});

async function getMigrationListCurrent() {
  const result = await database.query(`
    SELECT COUNT(*) AS total_migrations
    FROM public.pgmigrations;`);

  return result.rows[0].total_migrations;
}
