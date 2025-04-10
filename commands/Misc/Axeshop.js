const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "axeshop",
  description: "",
  category: "misc",
  args: false,
  usage: ["axeshop"],
  cooldown: 3,
  permissions: [],
  aliases: ["axeshop"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
.setAuthor(`🪓${message.author.username} Welcome To Axe Shop🪓 `)
.addField(  `**Wooden Axe:** ${user.woodaxe}
`,
`\`Wooden Axe Costs 10 USD And It Gives 2 Wood Every Single Time But Has A Super Long Cooldown Of 20 Seconds\``
)
.addField(  `**Bronze Axe:** ${user.bronzeaxe}
`,
`\`Bronze Axe Costs 30 USD And Gives 5 Wood Every Single Time And Has 18 Second Cooldown\``
)   
.addField(  `**Sliver Axe:** ${user.sliveraxe}
`,
`\`Sliver Axe Costs 75 USD And Gives 10 Wood Single Time And Cooldown Has Decreased To 13 Seconds\``
)   
.addField(  `**Gold Axe:** ${user.goldaxe}
`,
`\`Gold Axe Costs 500 USD AND MADE OUT OF PURE GOLD Gives 35 Wood Single Time And Cooldown Decreased To 8 Seconds\``
)
.addField(`** Jade Axe:** ${user.jadeaxe}
    `,
    `\`Jade Axe Costs A Whopping 1500 USD And Gives 80 Wood Single Time And Cooldown Increased To 10 Seconds .\``)
.addField(`       **Champion Axe:** ${user.chamaxe}
      `,
      `\`This Axe Cant Be Bought I Wonder How You Can Get It.\``)
.setFooter(`Tip : Axes Can Make You Richer Than You Think`)
.addField(`** How To Buy Axes?** 
    `,
    `\`p!axeshopbuy (item) exanmple p!axeshopbuy jade / p!axeshopbuy wooden same thing with using it p!usebronzeaxe .\``)
.setThumbnail(message.author.avatarURL())
  .setColor('#0000FF')

  message.channel.send(embed)
  }
}
