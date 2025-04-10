const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const config = require('../../config.js')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "techshop",
    description: "techshop",
    category: "misc",
    args: false,
    usage: ["techshop"],
    cooldown: 3,
    permissions: [],
    aliases: ["techshop"],
    execute: async (client, message, args, prefix, guild, color, channel) => {

      let embed = new MessageEmbed()
      .setDescription(`**Tech Shop**
      
**Tech Coin Exchange**
(${prefix}techshopbuy [Tech Coins amount])


1k Credits --> 100 Tech Coins
10k Credits ---> 1k Tech Coins
100K Credits --> 10k Tech Coins
1M Credits ---> 100k Tech Coins

**Items**
(${prefix}techshopbuy [item])


**Tech Watch** 

Watch You Can Wear Can Time Travel To Different Pokemon Era

Cost : 10k Tech Coins

**Tech Battery**

Charge Up The Tech Watch To Time Travel

Cost : 1K Tech Coins`)
      .setColor('#000000')
      
      message.channel.send(embed)

    }
}