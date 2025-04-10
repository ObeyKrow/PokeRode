const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "merchant",
    description: "merchant",
    category: "misc",
    args: false,
    usage: ["merchant"],
    cooldown: 3,
    permissions: [],
    aliases: ["mer"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

     

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
.setAuthor(`Merchant Veneo (Departs At 9/10/2022)`)

.addField(  `**Merchant Veneo**
`,
`\`Hey Champ I Got No Time So Be Fast\``
)
.addField(  `**WANTED LIST** 
`,
`\`Black Merchant

BLACK MERCHANT IS A MERCHANT WHO IS A SCAMMER HES CALLED BLACK MERCHANT AND HE GOES AROUND TOWNS AND SELL FAKE STUFF OR SELL REAL STUFF BUT HIGHBALL THEM SOMETIMES HE DO SELL LEGIT BUT SNEAKILY TAKES MONEY FROM YOU IF YOU FIND ANY SUSPICION OF BLACK MERCHANT ARRIVED CONTACT RodePolice And We Will Arrive Shortly\``
)   
.addField(  `**Shard Offer** | **Stock:**${user.stock1}
`,
`\`70 Shards Per 18k Pokecredits(${prefix}merchantbuyshards)\``
)   
.addField(  `**Credit Offer** | **Stock:**${user.stock2}
`,
`\`80 Shards For 22400 Credits Each(${prefix}merchantbuycredits)\``
)  
.addField(`** Redeem Offer** | **Stock:**${user.stock3}
    `,
    `\`24k Credits Each Redeem (${prefix}merchantbuyredeems) .\``)

.setFooter(`Secret : If The Merchant Name Is Aging , Mando , Obey There Might Be A Easter Egg`)

.setThumbnail(message.author.avatarURL())
  .setColor(color)
.setImage("https://cdn.discordapp.com/attachments/993109127154892882/997010468055040131/images_39.jpg")
  message.channel.send(embed)
  }
}
