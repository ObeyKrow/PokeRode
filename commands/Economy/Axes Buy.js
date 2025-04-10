const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "axeshopbuy",
    description: "bulldoze",
    category: "Miscellaneous",
    args: false,
    usage: ["axeshopbuy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "wooden") {
      
              if (user.usd < 10) return message.channel.send(`You don't have enough USD`)

      user.usd = user.usd - 10
      user.woodaxe = user.woodaxe + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Wooden Axe**`)

     } else if (args[0].toLowerCase() == "bronze") {
      
              if (user.usd < 30) return message.channel.send(`You don't have enough USD`)

      user.usd = user.usd - 30
      user.bronzeaxe = user.bronzeaxe + 1
      await user.save()

      return message.channel.send(`**You have successfully bought Bronze Axe *`)

  } else if (args[0].toLowerCase() == "sliver") {
      
              if (user.usd < 75) return message.channel.send(`You don't have enough USD`)

      user.usd = user.usd - 75
      user.sliveraxe = user.sliveraxe + 1
      await user.save()

      return message.channel.send(`**You have successfully bought Sliver axe *`)
      

  } else if (args[0].toLowerCase() == "gold") {
      
              if (user.usd < 500) return message.channel.send(`You don't have enough USD`)

      user.usd = user.usd - 500
      user.goldaxe = user.goldaxe + 1
      await user.save()

      return message.channel.send(`**You have successfully bought Gold axe *`)
      

  } else if (args[0].toLowerCase() == "jade") {
      
              if (user.usd < 1500) return message.channel.send(`You don't have enough USD`)

      user.usd = user.usd - 1500
      user.jadeaxe = user.jadeaxe + 1
      await user.save()

      return message.channel.send(`**You have successfully bought Jade axe *`)
      }
    

	}
}