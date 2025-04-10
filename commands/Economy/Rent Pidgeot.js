const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "ff2buy",
    description: "Buy a rent pidgeot",
    category: "Miscellaneous",
    args: false,
    usage: ["ff2buy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "pidgeot") {
      
              if (user.balance < 10000) return message.channel.send(`You don't have enough credits to buy  rented pidgeot`)

      user.balance = user.balance - 10000
      user.rentpidgeot = user.rentpidgeot + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Rented Pidgeot**`)
    }
    

	}
}