const express = require('express');
const albumsController = require('../controllers/album');
const router = express.Router();

router.post('/:id/albums', albumsController.createAlbum);
router.get('/', albumsController.readAlbum);
router.get('/:id', albumsController.singleAlbumById);

module.exports = router;