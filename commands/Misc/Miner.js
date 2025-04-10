const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "miner",
  description: "",
  category: "misc",
  args: false,
  usage: ["miner"],
  cooldown: 3,
  permissions: [],
  aliases: ["dig","min","dg"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
.setAuthor(`🛠️${message.author.username} Welcome To Miners Shop🛠️ `)
.addField(  `**Miner Jake**
`,
`\`OI IF YOU WANNA GO IN THERE CHECK MY SHOP BEFORE YOU GO \``
)
.addField(  `**Gateway** 
`,
`\`Gateway Cost 5 Credits To Go In So Every Time You Use Bulldoze You Lose 5 Credits\``
)   
.addField(  `**🔩Bulldoze:** ${user.bulldoze}
`,
`\`Bulldoze (${prefix}usebulldoze) Is A object Use To Dig But Now Its Use To Dig Pokemons Sometimes And Costs 10k Each\``
)   
.addField(  `**🪓Axe:** ${user.axe}
`,
`\`Use The Axe To Encounter Tree Type Pokemon And When You Catch One They Will Drop Some Wood You Can Use To Exhcnage Stuff In Miner Quest(${prefix}useaxe) and it costs 1k\``
)
.addField(`** ⛏️ Pickaxe:** ${user.pickaxe}
    `,
    `\`can encounter crystal like pokemons with pickaxe and can get crystal drops from them and exchange them in minder quest and costs 1k(${prefix}usepickaxe) .\``)
.addField(`       ** Rent Items:** 
      `,
      `\`OI IM NOT TAKING RENTING YET UNTIL I CAN GET ENOUGH POKECREDITS TO BUY MY APARTMENT RENT.\``)
.setFooter(`Tip : Every Thing You Buy Here Is Permanant So I Recommend Not Buying Over 1 Unless In Some Certain Occassions Or Just To Flex`)
.addField(`** How To Buy Miner Items?** 
    `,
    `\`All You Have To Do Is p!b1buy (item) for example p!b1buy bulldoze .\``)
.setThumbnail(message.author.avatarURL())
  .setColor('#964B00')
.setImage("https://cdn.discordapp.com/attachments/994237638158594069/997431080602849340/images_40.jpg")
  message.channel.send(embed)
  }
}
