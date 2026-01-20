import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("PUT to /api/v1/migrations should return 405", async () => {
  const putMigrations = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  expect(putMigrations.status).toBe(405);
});
