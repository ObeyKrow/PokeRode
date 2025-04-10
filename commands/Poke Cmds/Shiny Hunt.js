const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
var pokemon = require("./../../db/pokemon.js");
var forms = require("./../../db/forms.js");
var mega = require("./../../db/mega.js");
var shadow = require("./../../db/shadow.js");
var megashiny = require("./../../db/mega-shiny.js");
var primal = require("./../../db/primal.js");
var shiny = require('./../../db/shiny.js')
var gen8 = require('./../../db/gen8.js')
var galarians = require("./../../db/galarians.js");
var altnames = require("./../../db/altnames.js");
var levelup = require('./../../db/levelup.js')
var attacks = require("./../../db/attacks.js");
const { capitalize } = require("../../functions.js");

module.exports = {
  name: "shinyhunt",
  description: "You can select a specific pokémon to shiny hunt. Each time you catch that pokémon, your chain will increase. The longer your chain, the higher your chance of catching a shiny one!",
  category: "pokemon commands",
  args: false,
  usage: ["shinyhunt"],
  cooldown: 3,
  permissions: [],
  aliases: ["sh"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({ id: message.author.id })
    if (!user) return message.channel.send('You havent started yet!')

    let embed = new Discord.MessageEmbed()
      .setColor('	#F7CAC9')
      .setAuthor('⭐ Shiny Hunt')
      .setDescription(`You can select a specific pokémon to shiny hunt. Each time you catch that pokémon, your chain will increase. The longer your chain, the higher your chance of catching a shiny one!`)
      .addField("**Currently Hunting**", `${user.shname == null ? `Type \`${prefix}shinyhunt <pokémon>\` to begin.` : capitalize(user.shname)}`)
    if (user.shname !== null) embed.addField("**Chain**", user.shcount)
    if (!args[0]) return message.channel.send(embed)



    try {
      let Name = args.join("-").toLowerCase()
      let name = Name
      var hasNumber = /\d/
      if (hasNumber.test(name)) return message.channel.send("/") // if name has number in it

      const t = await get({
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        json: true
      })
      let url, shiny, re
      let check = t.id.toString().length

      if (check === 1) {
        url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
      } else if (check === 2) {
        url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
      } else if (check === 3) {
        url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
      }

      const type = t.types.map(r => {
        if (r !== r) re = r;
        if (re == r) return;
        return `${capitalize(r.type.name)}`
      }).join(" | ")

      if (user.shcount == 0 || user.shname == null) {
        user.shname = name
        await user.save()
        return message.channel.send(`You are now Shiny Hunting \`${name.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\`!`)
      } else {

        let msg = await message.channel.send(`Do you confirm to reset the last Shinyhunt streak of \`${user.shname.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\` (${user.shcount}) for \`${name.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\`?`)

        await msg.react("✅")
        msg.react("❌")

        const collector = msg.createReactionCollector((reaction, userx) => ['✅', '❌'].includes(reaction.emoji.name) && userx.id === message.author.id, { time: 30000 })

        collector.on('collect', async (reaction, userx) => {
          if (reaction.emoji.name === "✅") {
            collector.stop("success")
            msg.reactions.removeAll()
            user.shname = name
            user.shcount = 0
            await user.save()
            message.channel.send(`You are now Shiny Hunting \`${name.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\`!`)
          } else if (reaction.emoji.name === "❌") {
            collector.stop("aborted")
            msg.reactions.removeAll()
            message.channel.send("Cancelled.")
          }
        })
        collector.on("end", (userx, reason) => {
          if (reason == "success") {
            return
          }
          if (reason == "aborted") {
            return
          }
          msg.reactions.removeAll()
          return msg.edit("Aborted!")
        })
      }
    }
    catch (error) {
      let Name = args.join("-").toLowerCase()
      let name = Name.toLowerCase()
      if (error.toString().startsWith("StatusCodeError")) return message.channel.send(`That Pokemon Doesn\'t Exist.`)
      return message.channel.send(`Error!\`\`\`\n${error}\n\`\`\``)
    }



  }
}