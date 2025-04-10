const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "minerquest",
    description: "complete quests for reward",
    category: "tst",
    args: false,
    usage: ["minersquest"],
    cooldown: 3,
    permissions: [],
    aliases: ["mq"],
    execute: async (client, message, args, prefix, guild, color, channel) => {

      	
	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let apiping =  user.questcaught
  let apiping2 =  user.released
  let apiping3 = user.streak

let emoji = "<:front:873253088180441129><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
let emoji2 = "<:front:873253088180441129><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping < 199) emoji2 =
"<:front:873253088180441129><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping > 199) emoji2 = "<:fill:873263250224087040><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping > 399) emoji2 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping > 599) emoji2 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping > 799) emoji2 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar2:873263404192763986><:backbar:873253135727095878>"
if (apiping > 999) emoji2 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar2:873263404192><:fill2:873266000307572806>"
if (apiping > 1001) emoji2 = "**Quest Completed ✅**"

let emoji3 = "<:front:873253088180441129><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping3 < 5) emoji3 =
"<:front:873253088180441129><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping3 > 5) emoji3 = "<:fill:873263250224087040><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping3 > 9) emoji3 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping3 > 19) emoji3 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping3 > 29) emoji3 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar2:873263404192763986><:backbar:873253135727095878>"
if (apiping3 > 39) emoji3 = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar2:873263404192<:fill2:873266000307572806>"
if (apiping3 > 49) emoji3 = "**Quest Completed ✅**"

if (apiping2 < 199) emoji =
"<:front:873253088180441129><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping2 > 199) emoji = "<:fill:873263250224087040><:bar:873252898656645142><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping2 > 399) emoji = "<:fill:873263250224087040><:bar2:873263404192763986><:bar:873252898656645142><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping2 > 599) emoji = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar:873252898656645142><:backbar:873253135727095878>"
if (apiping2 > 799) emoji = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar2:873263404192763986><:backbar:873253135727095878>"
if (apiping2 > 999) emoji = "<:fill:873263250224087040><:bar2:873263404192763986><:bar2:873263404192763986><:bar2:873263404192763986><:fill2:873266000307572806>"
if (apiping2 > 1001) emoji = "**Quest Completed ✅**"
      let embed = new MessageEmbed()
      .setAuthor('Miner Quests')
        .setColor("	#36393e")
      .setDescription(`Miners Quests Gives USD ( NOTE THIS IS NOT REAL MONEY)!
      
      **Quest #1**\n**I Need 10 Wood Please Get Me I Will Pay You 10 USD.** \n \`${user.wood}/10\`\n**Reward:** 10 💵\n
      **Quest #2**\n**Need 100 Wood I Will Pay 10% More.**\n \`${user.wood}/100\`\n**Reward:** 110 💵\n
      **Quest #3**\n**Get 10 Crystals**\n \`${user.crystals}/10\`\n**Reward:** 10 💵
\n**Quest #4**\n**Get 100 Crystals 10% Profit**\n \`${user.crystals}/100\`\n**Reward:** 110 💵.`)
  

    if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim1") {
      if (user.wood <= 10) return message.channel.send(">  You Dont Have Enough Wood")
      
     user.usd = user.usd + 10;
     user.wood = user.wood -10;
     await user.save();
      return message.channel.send('>  :tada: You Claimed Quest Serial Number 1' )
      }
        if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim2") {
      if (user.wood <= 100) return message.channel.send(">  You Dont Have Enough Wood")
      
     user.usd = user.usd + 110;
     user.wood = user.wood - 100;
     await user.save();
      return message.channel.send('>  :tada: You Claimed Quest Serial Number 2' )
    }
   if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim3") {
      if (user.crystals <= 10) return message.channel.send(">  You Dont Know Enough Crystals")
      
     user.usd = user.usd + 10;
     user.crystals = user.crystals - 10;
     await user.save();
      return message.channel.send('>  :tada: You Claimed Quest Serial Number 3' )
    }
      if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim4") {
      if (user.crystals <= 100) return message.channel.send(">  You Dont Have Enough Crystals")
      
     user.usd = user.usd + 110;
     crystals = user.crystals - 100;
     await user.save();
      return message.channel.send('>  :tada: You Claimed Quest Serial Number 4' )
    }
    }
}