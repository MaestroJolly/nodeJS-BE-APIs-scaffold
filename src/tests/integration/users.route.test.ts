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
