const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("create album", () => {
  let artistId;
  beforeEach(async () => {
    const { status, body } = await request(app)
      .post("/artists")
      .send({ name: "Kurt Cobain", genre: "rock" });

    expect(status).to.equal(201);
    expect(body.name).to.equal("Kurt Cobain");
    expect(body.genre).to.equal("rock");
    artistId = body.id;
  });

  describe("/albums", () => {
    describe("POST", () => {
      it("creates a new album in the database", async () => {
        const { status, body } = await request(app)
          .post(`/artists/${artistId}/albums`)
          .send({
            name: "Nevermind",
            year: 1991,
            artistId: artistId,
          });

        expect(status).to.equal(201);
        expect(body.name).to.equal("Nevermind");
        expect(body.year).to.equal(1991);

        const {
          rows: [albumData],
        } = await db.query("SELECT name, year FROM Albums WHERE id = $1", [
          body.id,
        ]);
        expect(albumData.name).to.equal("Nevermind");
        expect(albumData.year).to.equal(1991);
      });
    });
  });
});
