const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "ff1buy",
    description: "Buy Rent Altaria",
    category: "Miscellaneous",
    args: false,
    usage: ["ff1buy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "altaria") {
      
              if (user.balance < 5000) return message.channel.send(`You don't have enough credits to buy  rented altaria`)

      user.balance = user.balance - 5000
      user.rentaltaria = user.rentaltaria + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Rented Altaria**`)
    }
    

	}
}