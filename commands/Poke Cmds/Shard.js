const Discord = require("discord.js")
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const config = require('../../config.js')

module.exports = {
  name: "shards",
  category: "Balance",
  description: "Shows balance of command user in pokecredits",
  usage: "shards",
  aliases: ["shards"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id});
    if(!user) return message.channel.send (`> ${config.no} **You must pick your starter pokémon with ${prefix}start before using this command.**`);
  

    const Embed = new Discord.MessageEmbed()
	    .setColor(color)
	    .setTitle(`${message.author.tag} Shards`)
      .setDescription(`You currently have \`${user.shards.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\` Shards.`)
	    
      message.channel.send(Embed);    
    
  }
}