const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const config = require('../../config.js')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "daycare",
    description: "Daycare Center Runned By Daycare Lily",
    category: "misc",
    args: false,
    usage: ["daycare"],
    cooldown: 2,
    permissions: [],
    aliases: ["day","dy","dc"],
    execute: async (client, message, args, prefix, guild, color, channel) => {

      let embed = new MessageEmbed()
        .setDescription(`**Daycare Center**

**Buying Eggs**

1 Egg  Per 1k Pokecredits  (${prefix}d1buy egg)


**Leveling Up**

Still In Testing

**Breeding**

Still In Testing`)

        .setFooter(`Tip : Daycare Are More Useful Than Rare Candys But Takes Time ( p!hatch egg to hatch it and p!egg to check your eggs`)
      
        
        .setColor(color)
.setImage("https://cdn.discordapp.com/attachments/991197392621817879/997033999132282880/79c7d7f29c47f28ab286da4409b92afcf35bb14925382fef2b4a5475568d5067.0.webp")
      message.channel.send(embed)

    }
}