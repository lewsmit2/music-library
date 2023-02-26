const express = require('express');
const albumsController = require('../controllers/album');
const router = express.Router();

router.post('/:id/albums', albumsController.createAlbum);

module.exports = router;