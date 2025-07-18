const axios = require('axios');

module.exports.config = {
  name: "ask",
  version: "1.0",
  hasPermission: 0,
  credits: "Islamick Chat",
  usePrefix: false,
  description: "M H BD AI",
  commandCategory: "General",
  cooldowns: 2,
};

const MAHIM = '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'; // 
const TAMIM = 'https://api.openai.com/v1/chat/completions';

const MD = "gpt-4o";

module.exports.run = async ({ api, event, args }) => {
  try {
    const question = args.join(' ');
    if (!question) {
      return api.sendMessage(
        "আপনার প্রশ্ন টি .ask লিখে অ্যাড করুন:📝",
        event.threadID
      );
    }

    // Request OpenAI API
    const response = await axios.post(
      TAMIM,
      {
        model: MD,
        messages: [
          { role: "user", content: question }
        ],
        max_tokens: 1024,
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${MAHIM}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = response.data.choices[0].message.content.trim();
    await api.sendMessage(answer, event.threadID);
  } catch (error) {
    console.error(error?.response?.data || error);
    await api.sendMessage(
      "❌ Something went wrong! 😒",
      event.threadID
    );
  }
};