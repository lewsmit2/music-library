const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', () => {
    let artist;
    let album;
    let singleArtistId;
    beforeEach(async () => {
        let albumData;
        let artistData;

        artistData = await Promise.all([
            db.query(
                `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`, [
                    'Nevermind',
                    'rock',
            ]),
        ]);
            artist = artistData.map(({ rows }) => rows[0]);
            singleArtistId = artist[0].id;

        albumData = await Promise.all([
            db.query(
                'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
            [
                'Nevermind',
                1991,
                singleArtistId
            ]),
            db.query(
                'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
            [
                'Bleach',
                1989,
                singleArtistId
            ]),
            db.query('INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *', 
            [
                'In Utero',
                1993,
                singleArtistId
            ]),
        ])

        album = albumData.map(({ rows }) => rows[0]);
        console.log(album);
    })

    describe('PATCH /albums/{id}', () => {
        it('updates the album and returns the updated record', async () => {
            const { status, body } = await request(app)
              .patch(`/albums/${album[0].id}`)
              .send({ name: 'new album', year: 1994, artistId: singleArtistId
            });
            expect(status).to.equal(200);

            expect(body).to.deep.equal({
              id: album[0].id,
              name: 'new album',
              year: 1994,
              artistid: singleArtistId
            });

            it('returns a 404 if the album does not exist', async () => {
                const { status, body } = await request(app)
                  .patch('/albums/999999999')
                  .send({ name: 'new album', year: 1994, artistid: singleArtistId
                });
            expect(status).to.equal(404);
            expect(body.message).to.equal('album 999999999 does not exist');
            });
        });
    });
})