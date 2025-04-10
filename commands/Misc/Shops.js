const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "shops",
  description: "",
  category: "misc",
  args: false,
  usage: ["shops"],
  cooldown: 3,
  permissions: [],
  aliases: ["shops"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
.setAuthor(`Shops `)
.addField(  `**Pokerode Shop**
`,
`\`${prefix}shop\``
)
.addField(  `**Fisherman shop** 
`,
`\`${prefix}fisherman\``
)   
.addField(  `**Miner Shop** 
`,
`\`${prefix}miner\``
)   
.addField(  `**fly Shop** 
`,
`\`${prefix}fly\``
)
.addField(`** Tech Shop** 
    `,
    `\`${prefix}techshop\``)
.addField(`       ** Summoner Shop** 
      `,
      `\`Coming Soon\``)

.addField(`** Champions Shop** 
    `,
    `\`Coming Soon\``)
.addField(`** Pickaxe Shop** 
    `,
    `\`Coming Soon\``)
.addField(`** Axe Shop** 
    `,
    `\`${prefix}axeshop\``)
.setThumbnail(message.author.avatarURL())
  .setColor('#FFFF00')

  message.channel.send(embed)
  }
}
