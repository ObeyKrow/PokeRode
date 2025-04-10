const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "fisherman",
  description: "",
  category: "misc",
  args: false,
  usage: ["fisherman"],
  cooldown: 3,
  permissions: [],
  aliases: ["fish","fs","fi"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
.setAuthor(`🐟${message.author.username} Welcome To Fishy Fish Shop🐟 `)
.addField(  `**Fisherman Eric**
`,
`\`Heloo There Lads You Come Fishing Today Well Look At My Shop It Has Good Rods And Very Good Price You Will Never See Anywhere\``
)
.addField(  `**Bait** 
`,
`\`When Ever You Fish It Will Cost 10 Credits Wondering Why ? Well You Need To Pay For The Bait To Bait Out The Fishes\``
)   
.addField(  `**🍥Normal Fishing Pass:** ${user.normalfishingpass}
`,
`\`Normal Fishing Pass Gives You Old Rod (${prefix}useoldrod) it costs 1k pokecredits to buy normal fishing pass\``
)   
.addField(  `**🐡Good Fishing Pass:** ${user.goodfishingpass}
`,
`\`Good Fishing Pass Gives You Good Rod (${prefix}usegoodrod) it costs 5k credits\``
)
.addField(`** 🎣 Super Fishing Pass:** ${user.superfishingpass}
    `,
    `\`Super Fishing Pass Gives You Super Rod (${prefix}usesuperrod) costs 30k credits but also gives you experienced fisherman title making you eligible to do fisherman quest .\``)
.addField(`       **🐟  Rent Fishing Pass:** ${user.rentfishingpass}
      `,
      `\`10 Credits Per Rent Rod.\``)
.setFooter(`Tip : Better The Rod Better The Pokemons And The Pass Are Permanant`)
.addField(`** How To Buy Passes?** 
    `,
    `\`All You Have To Do Is p!passbuy (item) for example p!passbuy super no need to add fishingpass .\``)
.setThumbnail(message.author.avatarURL())
  .setColor('#0000FF')
.setImage("https://cdn.discordapp.com/attachments/994237638158594069/997412302871597127/maxresdefault_4.jpg")
  message.channel.send(embed)
  }
}
