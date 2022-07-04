const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native')
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength } = require("../../functions");
const Pokemon = require("./../../Classes/Pokemon");
let Spawn = require('../../models/spawn.js')
let Guild = require('../../models/guild.js')
const Canvas = require('canvas')
 const canvas = Canvas.createCanvas(1192,670);
          const ctx = canvas.getContext('2d')


module.exports = {
  name: "dig",
  description: "Dig A Wild Pokemon In The Cave",
  category: "Pokemon",
  args: false,
  usage: ["dig"],
  cooldown: 60,
  permissions: [],
    aliases: ["di"],
    execute: async (client,message, args, prefix, guild, color, channel) => {
    let names = ["diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","geodude","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","diglett","diglett","geodude","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","diglett","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon"]
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
    var shiny = false
    //type = galarian
    gen = Math.floor(Math.random() * 8096);
    if (gen <= 10) shiny = true;
       let lvl = Math.floor(Math.random()*69) + 1
       let pokemon = new Pokemon({ name: x.name.toLowerCase(), id: x.id, shiny: shiny,  url: url }, lvl);

       pokemon = await classToPlain(pokemon)

       let imgname = 'new.png'
       let spawn = await Spawn.findOne({id: message.channel.id})
       if (!spawn) await new Spawn({ id: message.channel.id }).save();
       spawn = await Spawn.findOne({id: message.channel.id})
       spawn.pokemon = []
       spawn.pokemon.push(pokemon)
       spawn.time = 259200000 + Date.now()
       await spawn.save()

        let bg = "https://cdn.discordapp.com/attachments/986850465423720472/989876223779946516/download_70.jpg";
       ;
         
          const background = await Canvas.loadImage(bg)
          ctx.drawImage(background,0,0,canvas.width,canvas.height)
          const pk = await Canvas.loadImage(pokemon.url)
          ctx.drawImage(pk,300,100,550,550)
           embedx = new Discord.MessageEmbed()
            .setAuthor(`A New Pokemon Has Appeared`)
            .setDescription(`Guess the Pokemon and type \`${guild.prefix}catch <pokemon name>\``)
             .setColor('#add8e6')
             .attachFiles([{ name: "new.png", attachment: canvas.toBuffer() }])
            .setImage("attachment://" + "new.png")
    })
    return message.channel.send(embedx)
  
}
}