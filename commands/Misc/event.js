const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const config = require('../../config.js')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "event",
    description: "event",
    category: "misc",
    args: false,
    usage: ["event"],
    cooldown: 3,
    permissions: [],
    aliases: ["eve"],
    execute: async (client, message, args, prefix, guild, color, channel) => {

      let embed = new MessageEmbed()
      .setDescription(`**Tech Event**
      
      **Pokemons(By Far)**
      • Ufo Magnezone
      • Future Slowpoke
      • Ancient Zekrom
      • Diamond Carbink
      • Fire Ancient Oddish
      
      
      **Items**
      • Tech Watch
      • Tech Battery
      
      
      **New Features**
      • Time Travel
      
      **New Economy!**
      • Tech Coins
      
      **New Shop**
      • Tech Shop (${prefix}techshop)
      • Tech Crystal Shop (${prefix}techcrystalshop) `)
      .setColor('#000000')
      
      message.channel.send(embed)

    }
}