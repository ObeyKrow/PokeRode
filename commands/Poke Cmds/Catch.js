const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native')
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength } = require("../../functions");
const Pokemon = require("./../../Classes/Pokemon");
const config = require('../../config.js')
let Guild = require('../../models/guild.js');
let User = require("../../models/user.js");
let levelUp = require("../../db/levelup.js")
let Spawn = require("../../models/spawn.js");
let pokemon = require("../../db/pokemon.js");
let forms = require("../../db/forms.js");
let primal = require("../../db/primal.js");
let shinyDb = require("../../db/shiny");
let gen8 = require('../../db/gen8.js')
let altnames = require("../../db/altnames.js");
const { capitalize } = require("../../functions.js");

module.exports = {
  name: "catch",
  description: "Catch a wild pokemon when it appears in the chat.",
  category: "Pokemon Commands",
  cooldown: 0,
  permissions: [],
  args: false,
  usage: ["catch <pokemon>"],
  aliases: ["c"],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    let spawn = await Spawn.findOne({ id: message.channel.id })
    if (!spawn.pokemon[0]) return;
    let user = await User.findOne({ id: message.author.id })
    if (!user) return message.channel.send(`> ${config.no} **You need to pick a starter pokémon using the \`${prefix}start\` command before using this command!**`);
    let embed = new MessageEmbed()
    //let userx = await User.findOne({ id: message.author.id })
    //nature = userx.pokemons.nature.replace(/-+/g, " ")

    let name = args.join("-").toLowerCase()
    for (var i = 0; i < altnames.length; i++) {
      let org = []
      altnames[i].jpname.toLowerCase().split(" | ").forEach(nm => {
        org.push(nm.replace(" ", "-"))
      })
      for (let y = 0; y < org.length; y++) {
        if (org[y] == name.toLowerCase()) {
          let og = `${org[0]} | ${org[1]} | ${org[2]}`
          name = name.replace(name, og.toLowerCase().replace("-", " "))
        }
      }
    }
    const altjp = altnames.find(e => e.jpname.toLowerCase() === name.toLowerCase().replace("shiny-", "")),
      altfr = altnames.find(e => e.frname.toLowerCase() === name.toLowerCase().replace("shiny-", "")),
      altde = altnames.find(e => e.dename.toLowerCase() === name.toLowerCase().replace("shiny-", ""));
    if (altjp) name = name.toLowerCase().replace(altjp.jpname.toLowerCase(), altjp.name.toLowerCase());
    else if (altfr) name = name.toLowerCase().replace(altfr.frname.toLowerCase(), altfr.name.toLowerCase());
    else if (altde) name = name.toLowerCase().replace(altde.dename.toLowerCase(), altde.name.toLowerCase());

    let poke = spawn.pokemon[0];
    if (!poke) return;
    if (poke && name.toLowerCase() == poke.name.toLowerCase().split(/ +/g).join("-")) {
      spawn.pokemon = [];
      spawn.time = 0;
      spawn.hcool = false;
      await spawn.save();
      await spawn.markModified("pokemons");

      let chance = Math.floor(Math.random() * 100)

      let lvl = poke.level;
      poke.xp = ((lvl - 1) + 80 * lvl + 100 + 51);
      // poke.shiny = true 
      if ((user.shname !== null) && (name == user.shname.toLowerCase().replace(" ", "-")) && (chance > 98)) {
        poke.shiny = true
        user.shname = null
        user.shcont = 0
        await user.save()
      }
      await user.pokemons.push(poke);
      await user.caught.push(poke);
      user.lbcaught = user.lbcaught + 1;

      if (poke.shiny) {
        const hook = new Discord.WebhookClient('1006215613812846723', 'b4tvfqjbHXta7I-VsVKI_RXelufMRpT62X-haQzfa5Or69KHNDGmQDPll2gttYz2kRJc');
        let id = parseInt(poke.url.replace(".png", "").substring(56))
        const shinyemb = new MessageEmbed()
          .setAuthor(`${message.author.tag} caught a Shiny ${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}!`)
          .setImage(`https://assets.poketwo.net/shiny/${id}.png?v=26`)
          .setColor(color)
          .setThumbnail(message.author.displayAvatarURL())
        hook.send(shinyemb)
        user.shinyCaught = user.shinyCaught + 1;
        await user.save()
      }
      let caughtNo = user.caught.filter(r => r.name == name).length
      let balanceToAdd = 0
      if (caughtNo == 1) balanceToAdd = 25;
      if (caughtNo == 10) balanceToAdd = 250;
      if (caughtNo == 100) balanceToAdd = 2500;
      user.balance = user.balance + parseInt(balanceToAdd)
      await user.save();
      await user.markModified("pokemons");
      // console.log(balanceToAdd)

      let u, footer
      if (user.shname !== null) {
        name.toLowerCase().replace(" ", "-") == user.shname.toLowerCase().replace(" ", "-") ? u = `**A Wild ${poke.name} Has Been Caught**.\n 
  \`====General Info====\`
  \`Level : ${poke.level} ${poke.shiny ? "Shiny " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\`
  \`Total IV : ${poke.totalIV}% IV\`
  \`Nature : ${poke.nature}\`\n
  \`Ability: N/A\`\n
  \`Shiny: ${poke.shiny}\`
  \`====Shiny Chain====\`
  \`${balanceToAdd == 0 ? "." : `Credits Reiceived \`${balanceToAdd} Credits`}.\`\n\`Shiny Chain + 1\`\n
\`====Drops====\`
\`Tech Crystals\` : ${user.techcrystals}
\`Crystals\` : ${user.crystals}
\`Wood\` : ${user.wood}
\`Rodeboosts\` : ${user.rodeboost}
\`` : u = `**A Wild ${poke.name} Has Been Caught**.\n 
\`====General Info====\`
\`Level : ${poke.level} ${poke.shiny ? "Shiny " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\`
\`Total IV : ${poke.totalIV}% IV\`
\`Nature : ${poke.nature}\`\n
\`Ability: N/A \`\n
\`Shiny: ${poke.shiny}\`
\`====Shiny Chain====\`
\`${balanceToAdd == 0 ? "." : `, Credits Reiceived \` ${balanceToAdd}`}\`\n +1 Caught\`\n
\`====Drops====\`
\`Tech Crystals\` : ${user.techcrystals}
\`Crystals\` : ${user.crystals}
\`Wood\` : ${user.wood}
\`Rodeboosts\` : ${user.rodeboost}`

        

        footer = ` `
        if (name == user.shname.toLowerCase().replace(" ", "-")) footer = `Shinyhunt Chain Count: ${user.shcount + 1}`

        if (name == user.shname.toLowerCase().replace(" ", "-")) {
          ++user.shcount
          await user.save()
        }
      } else {
        u = `A Wild ${poke.name} Has Been Caught**.\n, 
        \`====General Info====\`
        __${poke.shiny ? "✨ Shiny " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}\`\n\n\`
\`Level\` : ${poke.level}\`\n
\`Total IV%\` - ${poke.totalIV}\`\n\`
\`Nature\` : ${poke.nature}\`\n
\`Ability: N/A \`\n
\`Shiny: ${poke.shiny}\`
\`Added To Pokédex - ${balanceToAdd == 0 ? "." : `Credits Received ${balanceToAdd}`}\`\n +1 Caught\`\n
\`====Drops====\`
\`Tech Crystals\` : ${user.techcrystals}
\`Crystals\` : ${user.crystals}
\`Wood\` : ${user.wood}
\`Rodeboosts\` : ${user.rodeboost}`
        footer = " "
      }
//${poke.shiny ? "Shiny " : ""}${poke.name.replace(/-+/g, " ").replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
      let embed = new MessageEmbed()
        .setFooter(footer)
        .setColor(color)
        .setDescription(u)
        .setFooter(`This Is Your ${user.shcount} Shiny Chain | Note : Do Not Auto Catch This Could Lead To A Suspension Or Server / Mutual Server Blacklist`)
        .setImage(`${poke.url}`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/991630664338243634/1015959984577716284/dcbbqpk-dd29029f-4591-4244-85b3-e45876a8bd91.gif`)

        let msg = await message.channel.send(embed);

        await msg.react("ℹ️")
        await msg.react("❌")
    const collector = msg.createReactionCollector((reaction, userx) => ['ℹ️', '❌'].includes(reaction.emoji.name) && userx.id === message.author.id, { time: 60000 });
      collector.on('collect', async (reaction, userx) => {
        if (reaction.emoji.name === "ℹ️") {
          collector.stop();
let af = user.pokemons.length - 1
let name = user.pokemons[af].name
if(user.pokemons[af].shiny === true) name = `:sparkles: ${capitalize(name)}`

let iv = (user.pokemons[af].hp + user.pokemons[af].atk + user.pokemons[af].def + user.pokemons[af].spatk + user.pokemons[af].spdef + user.pokemons[af].speed)/186 * 100

let xp = Math.floor(1.2* user.pokemons[af].level ^ 3 ) - (15 * user.pokemons[af].level ^ 2) + (100 * user.pokemons[af].level) - 140 + 52

let embed127 = new MessageEmbed()
.setColor(color)
.setImage(user.pokemons[af].url)
.setTitle(`Level ${user.pokemons[af].level} ${capitalize(name)}`)
.setDescription(`**═══Details═══**\n${user.pokemons[af].xp}/${xp}\n**Nature:** ${user.pokemons[af].nature}\n**Hp:** ${user.pokemons[af].hp}/31\n**Atk:** ${user.pokemons[af].atk}/31\n**Def:** ${user.pokemons[af].def}/31\n**Sp. Atk:** ${user.pokemons[af].spatk}/31\n**Sp. Def:** ${user.pokemons[af].spdef}/31\n**Speed:** ${user.pokemons[af].speed}/31\n**Total IV%** ${iv.toString().substr(0,5)}%`).setFooter(`Displaying pokemon: ${af + 1}/${user.pokemons.length}`)


      collector.stop();
                return message.channel.send(embed127)
                await msg.delete();
            }
             if (reaction.emoji.name === "❌") {
                collector.stop();
                let idx = parseInt(user.pokemons.length - 1)
                 let name = user.pokemons[idx].name
                     user.pokemons.pop()
      user.balance = user.balance + 10
      user.released = user.released + 1
      await user.save();
      await user.markModified("pokemons")
      return message.channel.send(`> **${config.yes} You Released your \`Level ${poke.level}${(poke.shiny ? " ✨   Shiny" : "")} ${capitalize(name)}\` and recieved 10  :moneybag: Coins.**`)

                await msg.delete();
            }
        });
        collector.on('end', collected => {
            return msg.reactions.removeAll();
        });
      
    } else {
      return message.channel.send(new MessageEmbed().setDescription(`> ${config.no} **That is the wrong Pokémon guess!**`).setColor(color))
    }
  }
}