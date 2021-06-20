import { app } from "../../app";
import request from "supertest";

// @test route - POST
test("POST /test", async () => {
  await request(app)
    .post("/v1/test")
    .set("Accept", "application/json")
    .send({ name: "john" })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).toBeTruthy();
      expect(response.body).toHaveProperty("name", "john");
      expect(response.body).toHaveProperty("req_ip");
    });
});

// @register route - POST
test("POST /register Negative Tests", async () => {
  await request(app)
    .post("/v1/register")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(401)
    .then((response) => {
      expect(response.body).toBeTruthy();
      expect(response.body).toHaveProperty("status", "error");
      expect(response.body).toHaveProperty(
        "message",
        "fullname is required. email is required. password is required. business_name is required. business_mobile is required. country is required"
      );
      expect(response.body).toHaveProperty("data", null);
    });
});

test("POST /register Positive Tests", () => {});
