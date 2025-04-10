const discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const hastebin = require("hastebin-gen");
const { uptime } = require('process');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const Spawn = require('../../models/spawn.js')
const ms = require("ms");
const moment = require('moment')
const client = new discord.Client()
let Pokemon = require('../../models/pokemons.js');
const { classToPlain } = require("class-transformer");

module.exports = {
  name: "stats",
  description: "shows stats of the bot",
  category: "Miscellaneous",
  args: false,
  usage: ["stats"],
  cooldown: 3,
  permissions: [],
  aliases: ["statistics"],

  execute: async (client, message, args, prefix, guild, color, channel) => {
    let embed = new discord.MessageEmbed()
    .setTitle(`Statistics of ${client.user.username}`)
    .setColor("#36393e")
    .addField('Lead Developers', '\`♣ |̴|̶𝘮̵̸̷ ̷̴̵|̵|̷ ̶~•.Obey#6745`')
    .addField('Developers', '\`Mando#0747 , Aging#0001`')
      .addField('Newbie Developers', '\`Uncle Door.#2929 , 𝙲𝚃𝙼•BlaZe#1407 `')
    .addField ('Special Command Access / Head Staff Teams -- ','\`ᧁꫝꪮડ𝕥#3131`')
     .addField ('Credits', '\Toxic Lemon ')
    .addField("Invite", " [INVITE ME](https://discord.com/api/oauth2/authorize?client_id=986888803044179990&permissions=8&scope=bot)",true)
    .addField('Discord Version', `\`v${discord.version}\``)
    message.channel.send(embed)
    .setThumbnail(client.user.displayAvatarURL())
  }
}
