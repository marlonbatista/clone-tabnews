import database from "infra/database";
import orquestrator from "tests/orchestrator";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await cleanDataBase();
});

async function cleanDataBase() {
  await database.query("drop schema  public cascade; create schema public;");
}

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(process.env.NODE_ENV).toBe("test");

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
