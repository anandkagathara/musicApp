// controllers/audioController.js

const { validationResult } = require("express-validator");
const { audioValidationRules } = require("../validators/audioValidator");
const {
  createAudio,
  getAudioById,
  updateAudio,
  deleteAudio,
  getAudioList,
} = require("../helpers/audioHelper");

const ffprobe = require("ffprobe");
const ffprobeStatic = require("ffprobe-static");
const path = require("path");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const songFile = req.files.song[0];
  const songPath = path.join(__dirname, "..", "upload", songFile.filename);
  const probe = await ffprobe(songPath, { path: ffprobeStatic.path });
  const duration = probe.streams[0].duration;

  if (duration < 30) {
    return res
      .status(422)
      .json({
        error: "The uploaded audio file must be at least 30 seconds long",
      });
  }

  const data = {
    name: req.body.name,
    image: req.files.image[0].filename,
    description: req.body.description,
    song: songFile.filename,
  };

  const audio = await createAudio(data);
  res.json(audio);
};

exports.get = async (req, res) => {
  const audio = await getAudioById(req.params.id);
  if (!audio) {
    return res.status(404).json({ error: "Audio not found" });
  }
  res.json(audio);
};



exports.update = async (req, res) => {


  const songFile = req.files.song[0];
  const songPath = path.join(__dirname, "..", "upload", songFile.filename);
  const probe = await ffprobe(songPath, { path: ffprobeStatic.path });
  const duration = probe.streams[0].duration;

  if (duration < 30) {
    return res
      .status(422)
      .json({
        error: "The uploaded audio file must be at least 30 seconds long",
      });
  }

  const data = {};

  if (req.body.name) {
    data.name = req.body.name;
  }

  if (req.files.image) {
    data.image = req.files.image[0].filename;
  }
  if (req.body.description) {
    data.description = req.body.description;
  }
  if (req.files.song) {
    const songFile = req.files.song[0];
    const songPath = path.join(__dirname, "..", "upload", songFile.filename);
    const probe = await ffprobe(songPath, { path: ffprobeStatic.path });
    const duration = probe.streams[0].duration;

    if (duration < 30) {
      return res
        .status(422)
        .json({
          error: "The uploaded audio file must be at least 30 seconds long",
        });
    }

    data.song = songFile.filename;
  }
  const audio = await updateAudio(req.params.id, data);
  if (!audio) {
    return res.status(404).json({ error: "Audio not found" });
  }
  res.json(audio);
};

exports.delete = async (req, res) => {
  const audio = await deleteAudio(req.params.id);
  if (!audio) {
    return res.status(404).json({ error: "Audio not found" });
  }
  res.json(audio);
};

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // current page, default to 1
  const limit = parseInt(req.query.limit) || 10; // number of items per page, default to 10
  const startIndex = (page - 1) * limit;

  const audioList = await getAudioList();
  const total = audioList.length;

  const results = {};

  results.total = total;
  results.data = audioList.slice(startIndex, startIndex + limit);

  res.json(results);
};
