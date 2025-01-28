const Discord = require("discord.js");
const moment = require("moment");
const talkedRecently = new Set();
const ms = require("ms");
const { parseZone } = require("moment");

module.exports.run = async(client, message, args)  => {

  
 if(!message.member.roles.cache.get('1007764818184392854') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanmak için yetkiniz bulunmamakta.')

 if(!args[0]) return message.channel.send('Sunucudan kimi banlamamı istersin?')

let reason = args.slice(1).join(' ')
let cardin = message.mentions.users.first() || client.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
if(!reason) return message.channel.send('Bir sebep belirt.')
if(!cardin) return message.channel.send('Belirtilen kullanıcı sunucuda bulunmamakta.')
let member = message.guild.member(cardin)
if(!member) return message.channel.send('Belirtilen kullanıcı sunucuda bulunmamakta.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Etiketlenen kullanıcı sizden üst/aynı pozisyonda.')
  member.ban({days: 7, reason: reason})

         const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL ({ dynamic : true }))
        .setColor(`GREEN`)
        .setDescription(`<@${member.id}> (\`${member.id}\`) Adlı kullanıcı <@${message.author.id}> tarafından sunucudan yasaklandı.

      • Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
      • Sebebi: \`${reason}\`
      • Kanal: \`${message.channel.name}\`
        `)
        .setFooter(`Görkem ban sistemi`)
        message.channel.send(embed)
        message.react('✅')

                 const cardinlog = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL ({ dynamic : true }))
        .setColor(`GREEN`)
        .setDescription(`<@${member.id}> (\`${member.id}\`) Adlı kullanıcı <@${message.author.id}> tarafından sunucudan yasaklandı.

      • Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
      • Sebebi: \`${reason}\`
      • Kanal: \`${message.channel.name}\`
        `)
        .setFooter(`Görkem Ban Log`)
       client.channels.cache.get('1007928691759792128').send(Gorkemlog)
  

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ban", "yasakla"],
    PermLvl: 0,
}

exports.help = {
  name: 'ban'
};
