const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const Daily = require('../../models/daily.js');
const ms = require("ms");
const config = require('../../config.js')

module.exports = {
  name: "daily",
  description: "Get credit rewards every day for just clicking a button!",
  category: "GettingStarted",
  args: false,
  usage: ["/"],
  cooldown: 3,
  permissions: [],
  aliases: ["vote"],
  execute: async (client, message, args, prefix, guild, color, channel) => {


    let user = await User.findOne({ id: message.author.id });
    if (!user) return message.channel.send(`> ${config.no} **You must pick your starter pokémon with \`${prefix}start\` before using this command.**`);

    if (!user.upvotes) user.upvotes = 0
    await user.save();
    let daily = await Daily.findOne({ id: message.author.id });
    if (!daily) await new Daily({ id: message.author.id }).save();
    daily = await Daily.findOne({ id: message.author.id });

    let upvotes = `${config.no} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 1) upvotes = `${config.yes} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 2) upvotes = `${config.yes} ${config.yes} ${config.no} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 3) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.no} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 4) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.no} ${config.no} ${config.no}`;
    if (user.upvotes == 5) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.no} ${config.no}`;
    if (user.upvotes == 6) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.no}`;
    if (user.upvotes > 6) upvotes = `${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes} ${config.yes}`;
    streak = upvotes + `\n\n**Your Rewards**\n
<:box_normal:974705704021672007> Bronze Crate: ${user.bronzecrate}
<:box_golden:974705704021672007> Silver Crate: ${user.silvercrate}
<:box_diamond:974705704021672007> Golden Crate: ${user.goldencrate}
<:box_master:974705704021672007> Diamond Crate: ${user.diamondcrate}
<:box_deluxe:974705704021672007> Deluxe Crate: ${user.deluxecrate}`



    // console.log(timeleft)

    const Embed = new Discord.MessageEmbed()
      .setTitle(`Voting Rewards`)
      .setColor(color)
      .setDescription(`**[Vote for the bot every 12 hours to gain rewards!](https://top.gg/servers/986850465423720469/vote)** Voting for the bot multiple days in a row will increase your streak and give you a chance at better rewards!\n\n[Vote Now](https://top.gg/servers/986850465423720469/vote)`)
      .addField(`Current Voting Streak: ${user.upvotes}`, streak)
      .setFooter("Once you have voted, you will get dm from the bot & Rewards will automatically redeemed to your account.")
    

    return message.channel.send(Embed);
  }
}