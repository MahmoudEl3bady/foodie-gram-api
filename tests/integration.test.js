import request from "supertest";
import { expect } from "chai";
import { app, server } from "../index.js";

describe("Integration Tests", () => {
  let token;

  before(async () => {
    // Signup the test user
    await request(app).post("/users/signup").send({
      fName: "test",
      lName: "user",
      pass: "test",
      email: "test@example.com",
      usrName: "testUser",
    });

    // SignIn the test user and get the token
    const response = await request(app).post("/users/signin").send({
      usrName: "testUser",
      pass: "test",
    });

    token = response.body.accessToken;
  });

  it("should get a list of recipes", async () => {
    const res = await request(app)
      .get("/recipes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });

  let recipeId ;
  it("should add a new recipe", async () => {
    const res = await request(app)
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id:recipeId,
        title: "new recipe",
        ingredients: "new ingredients of a recipe",
        instructions: "new instructions of a recipe",
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("msg", "Recipe added successfully!");
    recipeId =  res.body.recipe.id;
  }).timeout(30000);

  it("should update an old recipe", async () => {
    const res = await request(app)
      .put(`/recipes/${recipeId}`) 
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "updated recipe",
        ingredients: "updated ingredients of a recipe",
        instructions: "updated instructions of a recipe",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("msg", "Recipe updated successfully!");
  });
  it("should delete an old recipe", async () => {
    const res = await request(app)
      .delete(`/recipes/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("msg", "Recipe deleted successfully!");
  });
});
