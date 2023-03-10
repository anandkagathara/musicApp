const express = require("express");
const router = express.Router();
const { audioValidationRules } = require("../validators/audioValidator");
const {
  create,
  get,
  update,
  delete: deleteAudio,
  list,
} = require("../controllers/audioController");

const upload = require('../middlewares/upload');

const audioUpload = upload([{ name: 'song', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

router.post("/audio",audioUpload, create);
router.get("/audio/:id", get);
router.put("/audio/:id",  audioUpload,audioValidationRules(), update);
router.delete("/audio/:id", deleteAudio);
router.get("/audio", list);

module.exports = router;
