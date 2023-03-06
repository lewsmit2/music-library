const express = require("express");
const albumsController = require("../controllers/album");
const router = express.Router();

router.get("/", albumsController.readAlbum);

router.get("/:id", albumsController.singleAlbumById);

router.patch("/:id", albumsController.patchAlbumById);

router.delete("/:id", albumsController.deleteAlbumById);

module.exports = router;
