const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Delete Album", () => {
  let album;
  let singleArtistId;
  beforeEach(async () => {
    let albumData;

    const { rows } = await db.query(
        `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
        ["Nevermind", "rock"]
      );
    
    singleArtistId = rows[0].id;

    albumData = await Promise.all([
      db.query(
        "INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *",
        ["Nevermind", 1991, singleArtistId]
      ),
      db.query(
        "INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *",
        ["Bleach", 1989, singleArtistId]
      ),
      db.query(
        "INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *",
        ["In Utero", 1993, singleArtistId]
      ),
    ]);

    album = albumData.map(({ rows }) => rows[0]);
  });

  describe("DELETE /albums/{id}", () => {
    it("deletes the album and returns the deleted data", async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album[0].id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album[0].id,
        name: "Nevermind",
        year: 1991,
        artistid: singleArtistId,
      });
    });

    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .delete("/albums/999999999")
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 999999999 does not exist");
    });
  });
});
