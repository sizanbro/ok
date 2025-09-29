const moment = require("moment-timezone");

module.exports.config = {
  name: "autotime",
  version: "1.0.0",
  permission: 0,
  credits: "MAHIM ISLAM",
  description: "Automatic time-based messages",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "moment-timezone": ""
  }
};

const nam = [
  { timer: '12:00AM', message: ['🌙┆এখন রাত ১২টা\n✨ আজকের সমাপ্তি, আগামীকালের নতুন আশা\n🥰 ভালোবাসা রইলো অনেক অনেক'] },
  { timer: '1:00AM', message: ['🌌┆এখন রাত ১টা\n💫 সবাইকে শুভ রাত্রি\n🌠 স্বপ্নময় হয়ে ঘুমাও'] },
  { timer: '2:00AM', message: ['🌠┆এখন রাত ২টা\n😴 ঘুমানোই এখন সবচেয়ে বড় প্রেম\n💤 গভীর ঘুমে ডুবে যাও'] },
  { timer: '3:00AM', message: ['🌃┆এখন রাত ৩টা\n🤍 যারা জেগে আছো, আল্লাহ তোমাদের সহায় হোন\n🙏 সব দুঃখ দূরে যাক'] },
  { timer: '4:00AM', message: ['🕋┆এখন রাত ৪টা\n🌅 ফজরের আজান শুনতে শুনতে\n☁️ আল্লাহর রহমতের অপেক্ষায়'] },
  { timer: '5:00AM', message: ['🌄┆এখন সকাল ৫টা\n🕌 ফজরের নামাজে দাঁড়াও\n💫 আল্লাহর সান্নিধ্যে সকাল শুরু করো'] },
  { timer: '6:00AM', message: ['☀️┆এখন সকাল ৬টা\n🌺 নতুন সূর্যের আলোয় জাগো\n🌼 সকালের freshness উপভোগ করো'] },
  { timer: '7:00AM', message: ['🍳┆এখন সকাল ৭টা\n🥗 পুষ্টিকর নাস্তা সেরে নাও\n💪 দিনের এনার্জি বাড়াও'] },
  { timer: '8:00AM', message: ['💼┆এখন সকাল ৮টা\n🚀 কাজে লেগে পড়ো\n🎯 লক্ষ্য স্থির রেখো'] },
  { timer: '9:00AM', message: ['📈┆এখন সকাল ৯টা\n💫 Productivity mode ON\n🔥 পুরোদমে কাজ চালাও'] },
  { timer: '10:00AM', message: ['🤗┆এখন সকাল ১০টা\n💝 তোমাদের মিস করছি অসীম\n❤️ একটু হাসি পাঠালাম'] },
  { timer: '11:00AM', message: ['⚡┆এখন সকাল ১১টা\n🎯 Focus টিকিয়ে রাখো\n💥 আরও কিছুক্ষণ চেষ্টা চালাও'] },
  { timer: '12:00PM', message: ['🌞┆এখন দুপুর ১২টা\n💖 ভালোবাসা বিলিয়ে দাও\n🤗 কাছের মানুষদের খোঁজ নাও'] },
  { timer: '1:00PM', message: ['🕌┆এখন দুপুর ১টা\n🙏 জোহরের নামাজ আদায় করো\n🍽️ তারপর স্বাস্থ্যকর lunch করো'] },
  { timer: '2:00PM', message: ['🍚┆এখন দুপুর ২টা\n🥘 পেট ভরে খেয়ে নাও\n😊 কিন্তু overeating এড়িয়ে চলো'] },
  { timer: '3:00PM', message: ['🎯┆এখন বিকাল ৩টা\n🚀 কাজে ফোকাস বাড়াও\n💫 বিকেলটা productive করে তুলো'] },
  { timer: '4:00PM', message: ['🕋┆এখন বিকাল ৪টা\n🌅 আসরের নামাজ পড়ে নাও\n🍃 মন শান্ত রাখো'] },
  { timer: '5:00PM', message: ['🌇┆এখন বিকাল ৫টা\n☕ এক কাপ চা/কফি নাও\n🧘‍♂️ একটু ব্রেক নাও নিজের জন্য'] },
  { timer: '6:00PM', message: ['👨‍👩‍👧‍👦┆এখন সন্ধ্যা ৬টা\n💝 পরিবারের সাথে quality time কাটাও\n🍲 একসাথে dinner করো'] },
  { timer: '7:00PM', message: ['🌃┆এখন সন্ধ্যা ৭টা\n🕌 এশার নামাজ পড়ে নাও\n🌟 দিনের শেষ ইবাদত সেরে নাও'] },
  { timer: '8:00PM', message: ['📝┆এখন রাত ৮টা\n✅ আজকের unfinished tasks শেষ করো\n🗓️ আগামীকালের plan করো'] },
  { timer: '9:00PM', message: ['🌙┆এখন রাত ৯টা\n🛀 ঘুমানোর প্রস্তুতি নাও\n📱 screen time কমাও'] },
  { timer: '10:00PM', message: ['😴┆এখন রাত ১০টা\n💤 শুয়ে পড়ো সময়মতো\n🌈 সুন্দর স্বপ্ন দেখো'] },
  { timer: '11:00PM', message: ['🌜┆এখন রাত ১১টা\n💝 শুভ রাত্রি আমার প্রিয় মানুষগুলো\n🤗 আল্লাহ হেফাজতে রাখুন সবাইকে'] }
];
module.exports.onLoad = function ({ api }) {
  setInterval(() => {
    const currentTime = moment().tz("Asia/Dhaka").format("h:mmA"); // e.g., "1:00AM"
    const match = nam.find(entry => entry.timer === currentTime);

    if (match) {
      const msg = match.message[Math.floor(Math.random() * match.message.length)];
      //const styled = `╭─⌘─⌯༊ৡৢ͜͡✦\n│ ${msg}\n╰──────────⌘`;
        const styled = `♡︎⎯͢⎯⃝🩷 ${msg}♡︎⎯͢`;

      for (const threadID of global.data.allThreadID) {
        api.sendMessage(styled, threadID);
      }
    }
  }, 60000); // check every 1 minute
};

module.exports.run = function () {};