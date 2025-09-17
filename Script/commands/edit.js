const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "edit",
  version: "1.1",
  author: "alexfiqure",
  cooldowns: 5, // Lowered cooldown to 5 seconds
  role: 0,
  shortDescription: "Edit image with text prompt",
  longDescription: "Edits an image using the provided text prompt and replied image",
  category: "image",
  guide: "{p}edit <prompt> (reply to image)"
};

module.exports.run = async function({ api, event, args }) {
  if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
    return api.sendMessage(
      "❌ | Please reply to an image with your prompt, like:\n{p}edit <prompt>",
      event.threadID,
      event.messageID
    );
  }

  const imageUrl = event.messageReply.attachments[0].url;
  const prompt = args.join(" ");

  if (!prompt) {
    return api.sendMessage("❌ | Please provide a text prompt for editing the image.", event.threadID, event.messageID);
  }

  api.sendMessage("🔄 | Editing your image, please wait...", event.threadID, event.messageID);

  try {
    const editApiUrl = `http://193.149.164.141:9995/i/api/edit?url=${encodeURIComponent(imageUrl)}&txt=${encodeURIComponent(prompt)}`;
    const response = await axios.get(editApiUrl, { responseType: "arraybuffer" });

    const cacheFolderPath = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheFolderPath)) {
      fs.mkdirSync(cacheFolderPath);
    }
    const imagePath = path.join(cacheFolderPath, `${Date.now()}_edited_image.jpg`);
    fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));

    const stream = fs.createReadStream(imagePath);
    api.sendMessage({
      body: `✅ | Image edited with prompt: "${prompt}"`,
      attachment: stream,
    }, event.threadID, event.messageID);
  } catch (error) {
    console.error("Image edit error:", error);
    api.sendMessage("❌ | An error occurred while editing the image. Please try again later.", event.threadID, event.messageID);
  }
};