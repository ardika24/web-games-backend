const request = require("supertest");
const app = require("../app");

describe("POST /api/v1/auth/register", () => {
  const userPayload = { username: "test.superman", password: "superman123" };

  it('status: 400 and code "auth/register-invalid when request body empty', async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ username: "", password: "" })
      .set("Accept", "application.json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);

    expect(response.body.error.code).toEqual("auth/register-invalid");
  });

  it("status: 200 and the credential information", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(userPayload)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.username).toEqual(userPayload.username);
  });

  it('status: 400 and code "auth/user-exist" when user already exist', async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(userPayload)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);

    expect(response.body.error.code).toEqual("auth/user-exists");
  });
});
