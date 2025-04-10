const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "quests",
  description: "",
  category: "misc",
  args: false,
  usage: ["quests"],
  cooldown: 3,
  permissions: [],
  aliases: ["q","qt"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
.setAuthor(`Quests `)
.addField(  `**Miners Quest**
`,
`\`${prefix}minersquest\``
)
.addField(  `**Fisherman Quests** 
`,
`\`Coming Soon\``
)   
.addField(  `**Friendship Quest** 
`,
`\`Coming Soon\``
)   
.addField(  `**Tech Quest** 
`,
`\`Coming Soon\``
)
.addField(`** True Champion Quest:** 
    `,
    `\`Coming Soon\``)
.addField(`       ** Summoner Quest** 
      `,
      `\`Coming Soon\``)

.addField(`** Trainer Guild Quests** 
    `,
    `\`Coming Soon\``)
.setThumbnail(message.author.avatarURL())
  .setColor('#FFFF00')

  message.channel.send(embed)
  }
}
