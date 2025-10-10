const fs = require('fs');
const axios = require('axios');

module.exports.config = {
  name: "audio",
  version: "1.0.0",
  hasPermission: 0,
  credits: "mahimvia",
  description: "Send an audio file from the saved list by number and react with a heart",
  commandCategory: "media",
  usages: ".audio <number>",
  cooldowns: 5
};

const audioList = [
  // Add your audio URLs here. Example:
  "https://pouch.jumpshare.com/preview/fsqxfaEsW8Sn9rtE_7_qx50_kq3dCQdiVHfIlzibVazKzSJb35DfTLfjccJTubia_HnNUtncDu9zNvBvBenINu9xINQB0UpsBzdCr0Sj8rJPRQqBJhVDCms4wCKn1LNurU-EJTdqU9XWhGkS7j3NCm6yjbN-I2pg_cnoHs_AmgI.mp3",
  "https://archive.org/download/mahimcraft_1759930943_djkhairul/djkhairul.mp3",
  "https://archive.org/download/mahimcraft_1760063352_Facebook1141276687351767/Facebook_1141276687351767.mp3"
  // etc.
];

module.exports.run = async ({ api, event, args }) => {
  try {
    // React with heart to user's message
    api.setMessageReaction("🎶", event.messageID, () => {}, true);

    // Get the audio number from user input
    const audioNumber = parseInt(args[0], 10);

    if (isNaN(audioNumber) || audioNumber < 1 || audioNumber > audioList.length) {
      return api.sendMessage(
        `Please provide a valid audio number between 1 and ${audioList.length}.`,
        event.threadID,
        event.messageID
      );
    }

    const audioUrl = audioList[audioNumber - 1];

    // Download the audio file temporarily
    const response = await axios.get(audioUrl, { responseType: "arraybuffer" });
    const tempFilePath = `${__dirname}/temp_audio_${audioNumber}.mp3`;
    fs.writeFileSync(tempFilePath, Buffer.from(response.data, "binary"));

    // Send the audio file
    api.sendMessage(
      {
        body: ``,
        attachment: fs.createReadStream(tempFilePath)
      },
      event.threadID,
      () => {
        // Delete temp file after sending
        fs.unlinkSync(tempFilePath);
      },
      event.messageID
    );
  } catch (e) {
    console.log(e);
    api.sendMessage(`An error occurred: ${e.message}`, event.threadID, event.messageID);
  }
};