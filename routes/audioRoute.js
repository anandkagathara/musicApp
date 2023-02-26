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




router.post("/audio", upload.single('image'), audioValidationRules(), create);
router.get("/audio/:id", get);
router.put("/audio/:id",  upload.single('image'),audioValidationRules(), update);
router.delete("/audio/:id", deleteAudio);
router.get("/audio", list);

module.exports = router;
