const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const express = require ('express')
const Jimp = require("jimp");
const  db  = require('croxydb')
const tags = require('common-tags')

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//////////////////////////////

  client.on("ready", () => {
    client.channels.cache.get("1007782426103255050").join();
  })
///////////////////////////////
  

client.on("message", async msg => {
    if (msg.content.toLowerCase() === 'sa') {
      msg.reply('Aleyküm Selam Nasılsın? <a:syhkalp:841782368419053589>');
    }
  });

  client.on("message", async msg => {
    if (msg.content.toLowerCase() === 'slm') {
      msg.reply('Aleyküm Selam Nasılsın? <a:syhkalp:841782368419053589>');
    }
  });

  client.on("message", async msg => {
    if (msg.content.toLowerCase() === 'Selamın Aleyküm') {
      msg.reply('Aleyküm Selam Nasılsın? <a:syhkalp:841782368419053589>');
    }
  });

  client.on("message", async msg => {
    if (msg.content.toLowerCase() === 'Selam ') {
      msg.reply('Aleyküm Selam Nasılsın? <a:syhkalp:841782368419053589>');
    }
  });

  client.on("message", async msg => {
    if (msg.content.toLowerCase() === 'selam') {
      msg.reply('Aleyküm Selam Nasılsın? <a:syhkalp:841782368419053589>');
    }
  });

  client.on("message", message => {
    if(message.content.toLowerCase() == "<@!478293497166954507>") 
    return message.channel.send("Arkadaşlık atsana canısı")
});

client.on('guildMemberAdd', async(member) => {
    member.roles.add("1007764860697837670")
    }) // sunucuya girene oto rol verir.