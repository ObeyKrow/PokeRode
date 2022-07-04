const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "quest",
    description: "complete quests for reward",
    category: "tst",
    args: false,
    usage: ["quest"],
    cooldown: 3,
    permissions: [],
    aliases: ["q"],
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
      .setAuthor('Quests')
        .setColor("	#36393e")
      .setDescription(`Complete these quests to earn special rewards!
      **Quest #1**\n**Catch 5000 pokémon.** \n \`${user.caught.length.toString()}/5000\`\n**Reward:** 500,000 Pokecoins\n**Quest #2**\n**Release 1000 pokémon.**\n \`${user.released}/1000\`\n**Reward:** 25,000 Pokecoins\n**Quest #3**\n**Open 1000 Eggs**\n \`${user.openedegg}/1000\`\n**Reward:** 1,000,000 Pokecoins
\n**Extra Quests**
**Quest #1**\n**Get Yourself 10,000,000 balance**\n \`${user.balance}/10,000,000\`\n**Reward:** 5,000,000 Pokecoins.`)
  

    if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim1") {
      if (user.caught.length.toString() <= 1000) return message.channel.send(">  Complete the Quest first")
      if(user.questclaim === 1) return message.channel.send(">  You have already claimed the quest reward")
     user.balance = user.balance + 50000;
     user.questclaim = user.questclaim +1;
     await user.save();
      return message.channel.send('>  :tada: Quest Completed. Quest Rewards Recived!!' )
      }
        if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim2") {
      if (user.released <= 1001) return message.channel.send(">  Complete the Quest first")
      if(user.questclaim2 === 1) return message.channel.send(">  You have already claimed the Quest reward")
     user.balance = user.balance + 25000;
     user.questclaim2 = user.questclaim2 + 1;
     await user.save();
      return message.channel.send('>  :tada: Quest Completed. Quest Rewards Recived!!' )
    }
   if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim3") {
      if (user.openedegg <= 10) return message.channel.send(">  Complete the Quest first")
      if(user.questclaim3 === 1) return message.channel.send(">  You have already claimed the Quest reward")
     user.balance = user.balance + 10000;
     user.questclaim3 = user.questclaim3 + 1;
     await user.save();
      return message.channel.send('>  :tada: Quest Completed. Quest Rewards Recived!!' )
    }
      if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "claim4") {
      if (user.balance <= 1000000) return message.channel.send(">  Complete the Quest first")
      if(user.questclaim4 === 1) return message.channel.send(">  You have already claimed the Quest reward")
     user.balance = user.balance + 5000000;
     user.questclaim4 = user.questclaim4 + 1;
         await User.findOne({id: `${user}`})
user.badges.push("988135781820420096")
     await user.save();
      return message.channel.send('>  :tada: Quest Completed. Quest Rewards Recived!!' )
    }
    }
}