const axios = require("axios");
const fs = require("fs");

const stylishBackgrounds = [
  // Soft, pastel, gradient, and text-friendly backgrounds (direct JPG links)
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1496307653780-42ee777d4842?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a01b2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=900&q=80",
];

module.exports.config = {
  name: "cover",
  version: "5.0",
  hasPermssion: 0,
  credits: "alexfiqure & Copilot (no-canvas)",
  description: "Send a stylish Facebook cover with your info as text (no canvas needed)",
  usePrefix: true,
  prefix: true,
  commandCategory: "Cover",
  category: "cover",
  usages: ".cover [name] - [subtitle] - [address] - [email] - [phone]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users }) {
  let targetID = event.senderID;
  if (event.type === "message_reply") {
    targetID = event.messageReply.senderID;
  } else if (Object.keys(event.mentions).length > 0) {
    targetID = Object.keys(event.mentions)[0];
  }
  let userName = await Users.getNameUser(targetID);

  // Parse input
  const input = args.join(" ");
  const msg = input.split("-");
  const name = msg[0] ? msg[0].trim() : userName;
  const subtitle = msg[1] ? msg[1].trim() : "";
  const address = msg[2] ? msg[2].trim() : "";
  const email = msg[3] ? msg[3].trim() : "";
  const phone = msg[4] ? msg[4].trim() : "";

  // Pick a stylish background
  const bgUrl = stylishBackgrounds[Math.floor(Math.random() * stylishBackgrounds.length)];
  const coverPath = __dirname + "/cache/cover.jpg";
  // Download the image
  try {
    const response = await axios.get(bgUrl, { responseType: "arraybuffer" });
    fs.mkdirSync(__dirname + "/cache", { recursive: true });
    fs.writeFileSync(coverPath, Buffer.from(response.data, "utf-8"));
  } catch (e) {
    return api.sendMessage("❌ Failed to download background image.", event.threadID, event.messageID);
  }

  // Prepare info text
  let infoText = `🌈 𝙎𝙩𝙮𝙡𝙞𝙨𝙝 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 𝘾𝙤𝙫𝙚𝙧 🌈\n`;
  infoText += `─────────────\n`;
  infoText += `👤 Name: ${name}\n`;
  if (subtitle) infoText += `✨ Subtitle: ${subtitle}\n`;
  if (address) infoText += `🏠 Address: ${address}\n`;
  if (email) infoText += `✉️ Email: ${email}\n`;
  if (phone) infoText += `📞 Phone: ${phone}\n`;
  infoText += `─────────────\n`;
  infoText += `🖼️ (Image attached below!)`;

  // Send message with image
  api.sendMessage(
    {
      body: infoText,
      attachment: fs.createReadStream(coverPath),
    },
    event.threadID,
    (err, info) => {
      // Clean up the file after sending
      setTimeout(() => {
        try { fs.unlinkSync(coverPath); } catch (e) {}
      }, 30 * 1000);
    },
    event.messageID
  );
};