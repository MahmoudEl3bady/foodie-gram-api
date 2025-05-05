import request from "supertest";
import { expect } from "chai";
import { app, server } from "../index.js";

describe("Integration Tests", function () {
  this.timeout(30000);

  let token;
  let recipeId;

  before(async () => {
    try {
      // Signup the test user
      const signupRes = await request(app).post("/users/signup").send({
        fName: "test",
        lName: "user",
        pass: "Test@user1",
        email: "test@example.com",
        usrName: "testUser",
      });
      console.log("Signup response:", signupRes.body);

      // SignIn the test user and get the token
      const signinRes = await request(app).post("/users/signin").send({
        usrName: "testUser",
        pass: "Test@user1",
      });
      console.log("Signin response:", signinRes.body);

      if (!signinRes.body.accessToken) {
        throw new Error("No access token received from signin");
      }

      token = signinRes.body.accessToken;
      console.log("Token received:", token);
    } catch (error) {
      console.error("Setup error:", error);
      throw error;
    }
  });

  after(async () => {
    // Delete the test recipe
    if (recipeId) {
      await request(app)
        .delete(`/recipes/${recipeId}`)
        .set("Authorization", `Bearer ${token}`);
    }
    server.close();
  });

  // ====================== Recipe Tests ======================

  it("should get a list of recipes", async () => {
    const res = await request(app)
      .get("/recipes")
      .set("Authorization", `Bearer ${token}`);

    if (res.status !== 200) {
      console.log("Get recipes error:", res.body);
    }
    expect(res.status).to.equal(200);
  });

  it("should add a new recipe", async () => {
    const res = await request(app)
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "new recipe",
        ingredients: "new ingredients of a recipe",
        instructions: "new instructions of a recipe",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("msg", "Recipe added successfully!");
    expect(res.body.recipe).to.have.property("id");
    recipeId = res.body.recipe.id;
    console.log("Created recipe ID:", recipeId);
  });

  // ====================== Recipe Comment Tests ======================

  it("should add a new comment to the recipe", async () => {
    const res = await request(app)
      .post(`/recipes/${recipeId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        comment: "new comment",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("msg", "Comment added successfully!");
  });

  it("should get a list of comments for the recipe", async () => {
    const res = await request(app)
      .get(`/recipes/${recipeId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });

  // ====================== Recipe Likes Tests ======================

  it("should like the recipe", async () => {
    const res = await request(app)
      .post(`/recipes/${recipeId}/likes`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("msg", "Like added successfully!");
  });

  it("should get the likes count for the recipe", async () => {
    const res = await request(app)
      .get(`/recipes/${recipeId}/likes/count`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("likes", 1);
  });

  it("should unlike the recipe", async () => {
    const res = await request(app)
      .delete(`/recipes/${recipeId}/likes`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("msg", "Like deleted successfully!");
  });

  // ====================== Recipe Dislikes Tests ======================

  it("should dislike the recipe", async () => {
    const res = await request(app)
      .post(`/recipes/${recipeId}/dislikes`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("msg", "Dislike added successfully!");
  });

  it("should get the dislikes count for the recipe", async () => {
    const res = await request(app)
      .get(`/recipes/${recipeId}/dislikes/count`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("dislikes", 1);
  });

  it("should remove dislike from the recipe", async () => {
    const res = await request(app)
      .delete(`/recipes/${recipeId}/dislikes`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("msg", "Dislike deleted successfully!");
  });

  // ====================== Recipe Favorites Tests ======================

  it("should favorite the recipe", async () => {
    const res = await request(app)
      .post(`/f/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("msg", "Favorite added successfully!");
  });
});
