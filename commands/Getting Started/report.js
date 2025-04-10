const Discord = require('discord.js');
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const webhook1 = new Discord.WebhookClient('1006204541353594970','oSyR9WK6GuQ-3zsYhdPCEuqSbzF07mFgMKKVf_Lz0ETLuepSlpRTaUgEKCeEE1lupPPC')
module.exports = {
  name: "report",
  description: "Reports An User",
  category: "GettingStarted",
  args: true,
  usage: ["report <user>"],
  cooldown: 3,
  permissions: [],
  aliases: [],

   execute: async (client, message, args, prefix, guild, color, channel) => {

    if (!args[0]) return message.reply('Please add a user  to report!')

    message.reply(`✉ | ${message.author.username}, Thanks for the report! :)`)

    const bugReportEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) Report:`)
      .setDescription(`${args}`)
      .addField("On the server:", `${message.guild.name}`)
      .addField("Server ID:", `${message.guild.id}`)
     

    webhook1.send(bugReportEmbed)


  }
}