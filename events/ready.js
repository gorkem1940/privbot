const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "LISTENING", name: `Tanrısız ❤️ 1940 `}, status: 'dnd' })
};
