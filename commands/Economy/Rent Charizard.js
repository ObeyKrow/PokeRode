const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "ff3buy",
    description: "Buy a rent charizard",
    category: "Miscellaneous",
    args: false,
    usage: ["ff3buy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "charizard") {
      
              if (user.balance < 15000) return message.channel.send(`You don't have enough credits to buy  rented Charizard`)

      user.balance = user.balance - 15000
      user.rentcharizard = user.rentcharizard + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Rented Charizard**`)
    }
    

	}
}