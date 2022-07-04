const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const { capitalize } = require('../../functions.js')

module.exports = {
	name: "balance",
	description: "Display your credit balance.",
	category: "pokemon",
	args: false,
	usage: ["balance"],
	cooldown: 3,
	permissions: [],
	aliases: ["bal"],
	execute: async (client, message, args, prefix, guild, color, channel) => {
	
	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  if (!args[0]) {
	let embed = new MessageEmbed()
	.setAuthor(message.member.displayName + "'s Balance")
	.setDescription(`**PokeCredits**\n${user.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n\n**Shards**\n${user.shards.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
 

   .setThumbnail(message.author.avatarURL())
	.setColor('	ADD8E6')
  return message.channel.send(embed)
  } else if (args[0].toLowerCase() === "shards") {
    let embed1 = new Discord.MessageEmbed()
    .setAuthor(message.member.displayName + "'s Shards")
	.setDescription(`You currently have ${user.shards}  Shards.`)
  .setThumbnail('https://cdn.discordapp.com/attachments/986850465423720472/989838114732249108/1655631702948.png')
	.setColor('	ADD8E6')
  return message.channel.send(embed1)
  } else {
    return message.channel.send('Thats not a valid balance option!')
  }
  }
}