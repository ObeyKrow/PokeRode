const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "techshopbuy",
    description: "techshopbuy",
    category: "Miscellaneous",
    args: false,
    usage: ["techshopbuy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "techwatch") {
      
              if (user.techcoins < 10000) return message.channel.send(`You don't have enough techcoins to buy tech watch`)

      user.techcoins = user.techcoins - 10000
      user.techwatch = user.techwatch + 1
      await user.save()

      return message.channel.send(`**You have successfully bought 1 tech watch**`)
      
    } else if (args[0].toLowerCase() == "techbattery") {
      
              if (user.techcoins < 1000) return message.channel.send(`You don't have enough techcoins to buy tech battery`)

      user.techcoins = user.techcoins - 1000
      user.techbattery = user.techbattery + 1
      await user.save()

      return message.channel.send(`**You have successfully bought 1 tech battery**`)

    } else if (args[0].toLowerCase() == "100") {
      
              if (user.balance < 1000) return message.channel.send(`You don't have enough credits to buy 100 techcoins`)

      user.balance = user.balance - 1000
      user.techcoins = user.techcoins + 100
      await user.save()

      return message.channel.send(`**You have successfully exchanged 10k Credits to exchange to 100 Tech Coins**`)

     } else if (args[0].toLowerCase() == "1000") {
      
               if (user.balance < 10000) return message.channel.send(`You don't have enough credits to exchange to 1000 tech coins`)

      user.balance = user.balance - 10000
      user.techcoins = user.techcoins + 1000
      await user.save()

      return message.channel.send(`**You have successfully exchanged 10k Credits to 1000 Tech Coins**`)

  } else if (args[0].toLowerCase() == "10000") {
      
               if (user.balance < 100000) return message.channel.send(`You don't have enough credits to exchange to 10k tech coins`)

      user.balance = user.balance - 100000
      user.techcoins = user.techcoins + 10000
      await user.save()

      return message.channel.send(`**You have successfully exchanged 100k Credits to 10k Tech Coins**`)
     
    } else if (args[0].toLowerCase() == "100000") {
      
               if (user.balance < 1000000) return message.channel.send(`You don't have enough credits to exchange to 100k tech coins`)

      user.balance = user.balance - 1000000
      user.techcoins = user.techcoins + 100000
      await user.save()

      return message.channel.send(`**You have successfully exchanged 1M Credits to 100k Tech Coins**`)
    }
    

	}
}  