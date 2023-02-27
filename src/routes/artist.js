const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/album');
const artistController = require('../controllers/artist');

router.post('/', artistController.createArtist);

router.post('/:id/albums', albumsController.createAlbum);

router.get('/', artistController.readArtist);

router.get('/:id', artistController.singleArtistById);

router.patch('/:id', artistController.patchArtistById);

router.delete('/:id', artistController.deleteArtistById);

module.exports = router;