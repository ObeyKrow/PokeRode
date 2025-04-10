const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "inventory",
    description: "inventory",
    category: "Miscellaneous",
    args: false,
    usage: ["inventory"],
    cooldown: 3,
    permissions: [],
    aliases: ["inv"],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')
		let time = Date.now()
 let ping = time - message.createdTimestamp

let embed = new Discord.MessageEmbed()
.setColor(color)
.setTitle(`${message.author.username}'s inventory `)
.setDescription(`:wood: Wood : \`${user.wood}\`
🔮Crystals : \`${user.crystals}\`
💵USD : \`${user.usd}\`
Tech Coins : \`${user.techcoins}\`
Tech Crystals : \`${user.techcrystals}\`
Tech Watch : \`${user.techwatch}\`
Tech Battery : \`${user.techbattery}\`
`)
.setFooter(`Displaying 1 Page`)



    return message.channel.send(embed);

	}
}