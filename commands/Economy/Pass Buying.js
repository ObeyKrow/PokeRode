const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "passbuy",
    description: "passbuy",
    category: "Miscellaneous",
    args: false,
    usage: ["passbuy"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')


    if (args[0].toLowerCase() == "normal") {
      
              if (user.balance < 1000) return message.channel.send(`You don't have enough credits to buy  normal fishing pass`)

      user.balance = user.balance - 1000
      user.normalfishingpass = user.normalfishingpass + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Normal Fishing Pass You Can Use Old Rod Now**`)
       
   } else if(args[0].toLowerCase() == "good") {
      
              if (user.balance < 5000) return message.channel.send(`You don't have enough credits to buy  good fishing pass`)

      user.balance = user.balance - 5000
      user.goodfishingpass = user.goodfishingpass + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Good Fishing Pass You Can Use Good Rod Now**`)

  } else if (args[0].toLowerCase() == "super") {
      
              if (user.balance < 30000) return message.channel.send(`You don't have enough credits to buy  super fishing pass`)

      user.balance = user.balance - 30000
      user.superfishingpass = user.superfishingpass + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought SuperFishing Pass You Can Use Super Rod Now **`)

    } else if (args[0].toLowerCase() == "rent") {
      
              if (user.balance < 10) return message.channel.send(`You don't have enough credits to buy  rent fishing pass`)

      user.balance = user.balance - 10
      user.rentfishingpass = user.rentfishingpass + 1
      await user.save()

      return message.channel.send(`**You have successfully Bought Rent Fishing Pass You Can Use Rent Rod Now**`)
    }
    

	}
}