const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "techcrystalshop",
  description: "",
  category: "misc",
  args: false,
  usage: ["techcrystalshop"],
  cooldown: 3,
  permissions: [],

  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
.setAuthor(`⌚${message.author.username}'s Tech Crystal Shop⌚  `)
.addField(  `**🎁Tech Box:** ${user.techbox}
`,
`\`Tech Box Is Made By Professor Aging And It Contains Electric And Normal Type Pokemons And Costs Only 5 Tech Crystal Mostly Contains Uncommons\``
)
.addField(`**💊 Tech Capsules:** ${user.techcap}
    `,
    `\`Tech Capsule Is Made By Mad Scientist Yoko And It Cost 30 Tech Crystals It Contains Rare Pokemons Only And Has All Of Them.\``)
.addField(`       **🧰 Shiny Tech Chest:** ${user.shtech}
      `,
      `\`Shiny Tech Chest Was Made By Arceus Himself Not Much People HAVE EVEN SEEN IT nor its sells on most shops it cost 2200 Tech Crystals And Only Gives Shiny Rares That Are Electric | Steel | Normal.\``)
.setFooter(`p!open (item) do not use space and all lower case , to check your crystals p!inv`)
.setThumbnail(message.author.avatarURL())
  .setColor('#000000')

  message.channel.send(embed)
  }
}
