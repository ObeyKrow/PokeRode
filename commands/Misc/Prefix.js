const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')
const Guild = require(`../../models/guild.js`)

module.exports = {
  name: "prefix",
  description: "set new prefix",
  category: "Miscellaneous",
  args: true,
  usage: ["prefix <new prefix>"],
  cooldown: 3,
  permissions: [],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have permissions to do this')

    let guildop = Guild.findOne({id: message.guild.id})

   

    let user = User.findOne({id: message.author.id})
    if (!user) return message.channel.send(`You have not started yet! Type \`${guild.prefix}start\` to start!`)

    
    let newprefix = args[0]

    if (args[0].length > 3) { return message.channel.send(`You can set prefix with max 3 character!`)
  } else if (!args[0]) { return message.channel.send(`Give a new prefix to set!`)
  } else {

    guild.prefix = newprefix
    await guild.save();

    message.channel.send(`Prefix of this Server has been set to ${args[0]}`)
  }
  }
}