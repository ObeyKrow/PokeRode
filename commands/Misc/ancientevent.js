const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const config = require('../../config.js')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "ancientevent",
    description: "ancient event",
    category: "misc",
    args: false,
    usage: ["ancient"],
    cooldown: 3,
    permissions: [],
    aliases: ["anc"],
    execute: async (client, message, args, prefix, guild, color, channel) => {

      let embed = new MessageEmbed()
      .setDescription(`Ancient event has started with some new pokemons! We are looking forward to heat up the Ancient Event  with the best pokemon. Daily Giveaway and redeem in the  [Official Server](https://discord.gg/hPHvF8BggE) . Check out the pokemons that are added !
• Original Magearna( Not Redeemable) / Armored Mewtwo ( Not Redeemable)
• ancient-zekrom / ub-Laser
• senec-id / Sunlord
• Peta-caul`)
      .setColor(color)
      message.channel.send(embed)

    }
}