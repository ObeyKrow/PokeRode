const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const config = require('../../config.js')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "usewatch",
    description: "usewatch",
    category: "misc",
    args: false,
    usage: ["usewatch"],
    cooldown: 3,
    permissions: [],
    aliases: ["usewatch"],
    execute: async (client, message, args, prefix, guild, color, channel) => {
     let user = await User.findOne({id: message.author.id})
    if (!user) return message.channel.send('You havent started yet!')
 
      if (user.techwatch < 1) return message.channel.send(`You don't have a tech watch`)
      
      let embed = new MessageEmbed()
      .setDescription(`**Tech Watch Teleport Feature**
      Teleporting Costs 1 Tech Battery Each You Currently Have ${user.techwatch} Happy Time Traveling Dont Forget To Also Take Pictures , Crystals Are More Likely In Places That Are Not Usually Habitated
      
-> RandomRoute
-> RandomCave
-> Cave Of Origin
-> Flaro Garden
-> Fullmoon Island
-> Kyurems Cave
-> Research Facility
-> Pinwheel Forest
-> Lake Valor
-> Seafoam Island
-> Victory Road
-> Curuleon Cave
-> Sky Pillar
-> Obeys ????`)
        .setFooter(`p!teleport (args) Example: p!teleportrandomroute`)
      .setColor(color)
  .setImage("https://cdn.discordapp.com/attachments/986850465423720472/1002947377436569670/My_project.png")
      message.channel.send(embed)

    }
}