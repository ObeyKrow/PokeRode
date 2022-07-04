
const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native')
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength } = require("../../functions");
const Pokemon = require("./../../Classes/Pokemon");
let Spawn = require('../../models/spawn.js')
let Guild = require('../../models/guild.js')
const User = require('../../models/user.js')

const Canvas = require('canvas')
 const canvas = Canvas.createCanvas(1192,670);
          const ctx = canvas.getContext('2d')


module.exports = {
  name: "fish",
  description: "Hunt a wild pokemon every 3 minutes.",
  category: "Testing",
  args: false,
  usage: ["fish"],
  cooldown: 6 ,
  permissions: [],
   aliases: ["fs"],
    execute: async (client,message, args, prefix, guild, color, channel) => {

      
  let user = await User.findOne({id: message.author.id})
       
    let names = ["alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shelder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","manaphy","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","manaphy","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","manaphy","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","phione","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","kyogre","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","phione","kyogre","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","phione","mantine","seel","dewgong","spheal","walrein","sharpedo"]
    let name = names[Math.floor(Math.random() * names.length)]


    let ab = {
     url: `https://pokeapi.co/api/v2/pokemon/${name}`,
      json: true
    }    
    let embedx;
    await get(ab).then(async x => {
       let check = x.id.toString().length
        if (check === 1) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${x.id}.png`
          } else if (check === 2) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${x.id}.png`
          } else if (check === 3) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${x.id}.png`
          }

       let lvl = Math.floor(Math.random()*69) + 1
       let pokemon = new Pokemon({ name: x.name.toLowerCase(), id: x.id, shiny: false,  url: url }, lvl);

       pokemon = await classToPlain(pokemon)

       let imgname = 'new.png'
       let spawn = await Spawn.findOne({id: message.channel.id})
       if (!spawn) await new Spawn({ id: message.channel.id }).save();
       spawn = await Spawn.findOne({id: message.channel.id})
       spawn.pokemon = []
       spawn.pokemon.push(pokemon)
       spawn.time = 259200000 + Date.now()
       await spawn.save()
    user.summon = user.summon - 7
    await user.save();
           embedx = new Discord.MessageEmbed()
            .setAuthor(`A Fish has Grabbed The Hook !!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
             .setColor('#292b2c')
            .setImage(pokemon.url)
    })
    return message.channel.send(embedx)
  
}
}