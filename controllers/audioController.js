// controllers/audioController.js

const { validationResult } = require("express-validator");
const {
  audioValidationRules,
} = require("../validators/audioValidator");
const {
  createAudio,
  getAudioById,
  updateAudio,
  deleteAudio,
  getAudioList,
} = require("../helpers/audioHelper");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const data = {
    name: req.body.name,
    image: req.file.path,
    description: req.body.description,
    song: req.body.song,
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
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  const data = {
    name: req.body.name,
    image: req.file.image,
    description: req.body.description,
    song: req.body.song,
  };
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
    const audioList = await getAudioList();
    res.json(audioList);
  };
  