const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "playing", name: `@tnrsz1940 `}, status: 'dnd' })
};
