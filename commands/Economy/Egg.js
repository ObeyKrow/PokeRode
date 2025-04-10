const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "egg",
    description: "Egg Can Be Hatched By p!hatch egg",
    category: "Miscellaneous",
    args: false,
    usage: ["egg"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')
		let time = Date.now()
 let ping = time - message.createdTimestamp

let embed = new Discord.MessageEmbed()
.setColor(color)
.setTitle(`${message.author.username}'s Eggs 🥚`)
.setDescription(`You currently have \`${user.egg}\` Egg.`)
.setFooter(`Use p!hatch egg to Hatch the Egg`)
.setThumbnail('https://cdn.discordapp.com/attachments/994237638158594069/994952687370108979/1657250704192.png')


    return message.channel.send(embed);

	}
}