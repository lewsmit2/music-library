const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("create album", () => {
  let artistId;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES ( $1, $2 ) RETURNING *",
      ["Kurt Cobain", "rock"]
    );

    artistId = rows[0].id;
  });

  describe("/albums", () => {
    describe("POST", () => {
      it("creates a new album in the database", async () => {
        const { status, body } = await request(app)
          .post(`/artists/${artistId}/albums`)
          .send({
            name: "Nevermind",
            year: 1991,
          });

        expect(status).to.equal(201);
        expect(body.name).to.equal("Nevermind");
        expect(body.year).to.equal(1991);

        const {
          rows: [albumData],
        } = await db.query("SELECT * FROM Albums WHERE id = $1", [body.id]);

        expect(albumData.artistid).to.equal(artistId);
        expect(albumData.name).to.equal("Nevermind");
        expect(albumData.year).to.equal(1991);
      });
    });
  });
});
