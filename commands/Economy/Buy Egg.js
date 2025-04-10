const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "d1buy",
    description: "buying eggs cost 3000 credits",
    category: "Miscellaneous",
    args: false,
    usage: ["d1buy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "egg") {
      
              if (user.balance < 1000) return message.channel.send(`You don't have enough balance to buy egg`)

      user.balance = user.balance - 1000
      user.egg = user.egg + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought 1 egg**`)
    }
    

	}
}