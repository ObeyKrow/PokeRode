const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "b1buy",
    description: "bulldoze",
    category: "Miscellaneous",
    args: false,
    usage: ["b1buy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "bulldoze") {
      
              if (user.balance < 10000) return message.channel.send(`You don't have enough credits to buy bulldoze`)

      user.balance = user.balance - 10000
      user.bulldoze = user.bulldoze + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Bulldoze You Can Use Bulldoze Now**`)

     } else if (args[0].toLowerCase() == "axe") {
      
              if (user.balance < 1000) return message.channel.send(`You don't have enough credits to buy axe`)

      user.balance = user.balance - 1000
      user.axe = user.axe + 1
      await user.save()

      return message.channel.send(`**You have successfully bought Axe *`)

  } else if (args[0].toLowerCase() == "pickaxe") {
      
              if (user.balance < 1000) return message.channel.send(`You don't have enough credits to buy pickaxe`)

      user.balance = user.balance - 1000
      user.pickaxe = user.pickaxe + 1
      await user.save()

      return message.channel.send(`**You have successfully bought Pickaxe *`)
      }
    

	}
}