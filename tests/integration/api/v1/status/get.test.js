import orquestrator from "tests/orchestrator";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parseUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(typeof responseBody.dependencies.database.max_connections).toEqual(
    "number",
  );

  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(
    responseBody.dependencies.database.max_connections,
  ).toBeGreaterThanOrEqual(1);

  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
