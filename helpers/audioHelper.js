// helpers/audioHelper.js

const Audio = require("../models/audio");

exports.createAudio = async (data) => {
  const audio = new Audio(data);
  return audio.save();
};

exports.getAudioById = async (id) => {
  return Audio.findById(id);
};

exports.updateAudio = async (id, data) => {
  return Audio.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteAudio = async (id) => {
  return Audio.findByIdAndDelete(id);
};

exports.getAudioList = async () => {
  return Audio.find();
};
